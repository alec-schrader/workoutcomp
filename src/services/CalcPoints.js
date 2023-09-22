function calcPoints(workout) {
    let points = 0;
    switch(workout.category){
        case 1://Strength
            points = workout.duration* Math.pow(workout.intensity, 1.8)
            break;
        case 2://Cardio
            points = workout.duration * Math.pow((workout.intensity-69), 2)
            break;
        case 3://Wellness
            points = workout.duration
            break;
    }

    return points;
}

function getUsername(userid, users){
    for(const user of users) {
        if(user.username===userid) return user.profile.username;
    }
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
                cardio: 0,
                wellness: 0,
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
        }    
    }
    console.log(pointBreakdown)
    return pointBreakdown;
}

export { calcPoints, getPointsBreakdown }