import dayjs from "dayjs";

function calcPoints(workout) {
    let points = 0;
    const duration = workout.duration;
    const intensity = workout.intensity;
    switch(workout.category){
        case 1://Strength
            points = (duration/1000) * Math.pow(Math.max(intensity, 69), 1.8)
            break;
        case 2://Cardio
            points = (duration/1000) * Math.pow((Math.max(intensity, 69)-69), 2)
            break;
        case 3://Wellness
            points = duration
            break;
        case 4://USP
            points = intensity
            break;
        default:
            break;
    }

    const multiplier = 1 + (.01 * workout.multiplier);
    return Math.floor(points * multiplier);
}

function calcAllPoints(workouts) {
    workouts = workouts.sort((a, b) => {
        const adate = dayjs(a.date);
        const bdate = dayjs(b.date);
        const diff = adate.diff(bdate,'day');
        if(diff === 0){
            return b.category - a.category
        }
        return diff
    })
    let lastWorkouts = {}
    for(const workout of workouts){
        if(!lastWorkouts[workout.owner]){
            lastWorkouts[workout.owner] = {
                date: dayjs(workout.date),
                multiplier: 0
            }
        }

        const workoutdate = dayjs(workout.date);
        const dateDiff = workoutdate.diff(lastWorkouts[workout.owner].date, 'day');
        switch(dateDiff){
            case 0://don't add or reset if multiple workouts on the same day
                break;
            case 1://add if workouts are one day apart
                if(workout.category === 1 || workout.category === 2){
                    lastWorkouts[workout.owner].date = workoutdate;
                    lastWorkouts[workout.owner].multiplier = Math.min(lastWorkouts[workout.owner].multiplier + 1, 10);
                }
                break;
            default://reset if workouts are more than a day apart
                lastWorkouts[workout.owner].date = workoutdate;
                lastWorkouts[workout.owner].multiplier = 0;
                break;
        }

        workout.multiplier = lastWorkouts[workout.owner].multiplier;
        workout.points = calcPoints(workout);
    }
    console.log(workouts)
    return workouts
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
            console.log(workout)
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
                usp: 0,
                totalPoints: 0,
                rank: 0,
                owner: workout.owner,
                lastworkout: dayjs('1/1/1900'),//initial state for calcing multiplier
                multiplier: 0,
                id: rowcnt
            }
            pointBreakdown.push(row);
            rowcnt++;
        }

        const date1 = dayjs('2019-01-25')
        date1.diff('2018-06-05', 'month', true)
        
        switch(workout.category){
            case 1://Strength
                row.strength += workout.points;
                break;
            case 2://Cardio
                row.cardio += workout.points;
                break;
            case 3://Wellness
                row.wellness += workout.points;
                break;
            case 4://USP
                row.usp += workout.points;
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

export { calcPoints, getPointsBreakdown, calcAllPoints }