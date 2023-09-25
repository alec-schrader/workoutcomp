function calcPoints(workout) {
    let points = 0;
    const duration = workout.duration;
    const intensity = workout.intensity;
    switch(workout.category){
        case 1://Strength
            points = (duration/1000) * Math.pow(intensity, 1.8)
            break;
        case 2://Cardio
            points = (duration/1000) * Math.pow((intensity-69), 2)
            break;
        case 3://Wellness
            points = duration
            break;
        default:
            break;
    }

    return Math.floor(points);
}

function getUsername(userid, users){
    for(const user of users) {
        if(user.username===userid) return user.profile.username ? user.profile.username : 'Primal';
    }
}

function getRowRankings(rows, category) {
    const pointsPerCategory = rows.length - 1;
    rows = rows.sort((a,b) => b[category] - a[category]);
    for(let i = 0; i < rows.length; i++){
        rows[i][category + 'Rank'] = pointsPerCategory - i;
        rows[i][category + 'Disp'] = `${rows[i][category]} (${pointsPerCategory - i})`
    }
    return rows
}

function getPointsBreakdown(workouts, users){
    let pointBreakdown = [];
    let rowcnt = 0;
    for(const workout of workouts) {
        const points = calcPoints(workout);
        let row;
        //get row if it exists
        for(const r of pointBreakdown){
            if(r.owner === workout.owner){
                row = r;
                break;
            }
        } 
        //create it if it doesn't
        if(!row){
            row = { 
                username: getUsername(workout.owner, users),
                strength: 0,
                strengthRank:0,
                strengthDisp:'',
                cardio: 0,
                cardioRank:0,
                cardioDisp:'',
                wellness: 0,
                wellnessRank: 0,
                wellnessDisp: '',
                totalPoints: 0,
                rank: 0,
                owner: workout.owner,
                id: rowcnt
            }
            pointBreakdown.push(row);
            rowcnt++;
        }
        
        switch(workout.category){
            case 1://Strength
                row.strength += points
                break;
            case 2://Cardio
                row.cardio += points
                break;
            case 3://Wellness
                row.wellness += points
                break;
            default:
                break;
        }    
    }
    pointBreakdown = getRowRankings(pointBreakdown, 'cardio');
    pointBreakdown = getRowRankings(pointBreakdown, 'strength');
    pointBreakdown = getRowRankings(pointBreakdown, 'wellness');

    for(const row of pointBreakdown) {
        row.totalPoints = row.cardioRank + row.strengthRank + row.wellnessRank
    }

    pointBreakdown = pointBreakdown.sort((a,b) => b.totalPoints - a.totalPoints);

    for(let i = 0; i < pointBreakdown.length; i++){
        pointBreakdown[i].rank = i + 1;
    }

    return pointBreakdown;
}

export { calcPoints, getPointsBreakdown }