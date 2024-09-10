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
            return a.category - b.category
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
    return workouts
}

function getUsername(userid, users){
    for(const user of users) {
        if(user.username===userid) return user.profile.username ? user.profile.username : 'Primal';
    }
}

function getRowRankings(rows, category) {
    const pointsPerCategory = rows.length - 1;
    rows = rows.sort((a,b) => b[category].score - a[category].score);
    for(let i = 0; i < rows.length; i++){
        rows[i][category].points = pointsPerCategory - i;
        rows[i][category].rank = i;
        rows[i][category].disp = `${rows[i][category].score} (${pointsPerCategory - i})`
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
            row = new pointBreakdownRow(workout, users, rowcnt)
            pointBreakdown.push(row);
            rowcnt++;
        }

        const date1 = dayjs('2019-01-25')
        date1.diff('2018-06-05', 'month', true)
        let category;
        switch(workout.category){
            case 1://Strength
                category = row.strength;
                break;
            case 2://Cardio
                category = row.cardio;
                break;
            case 3://Wellness
                category = row.wellness;
                break;
            case 4://USP
                category = row.usp;
                break;
            default:
                break;
        }   
        
        category.score += workout.points;
        category.totalDuration += workout.duration;
        category.totalIntensity += workout.intensity;
        category.workoutsCnt++;
    }
    pointBreakdown = getRowRankings(pointBreakdown, 'cardio');
    pointBreakdown = getRowRankings(pointBreakdown, 'strength');
    pointBreakdown = getRowRankings(pointBreakdown, 'wellness');

    for(const row of pointBreakdown) {
        row.totalPoints = row.cardio.points + row.strength.points + row.wellness.points;
        row.strength.setAverages();
        row.cardio.setAverages();
        row.wellness.setAverages();
    }

    pointBreakdown = pointBreakdown.sort((a,b) => b.totalPoints - a.totalPoints);

    for(let i = 0; i < pointBreakdown.length; i++){
        pointBreakdown[i].rank = i + 1;
    }

    return pointBreakdown;
}

class pointBreakdownRow{
    constructor(workout, users, rowcnt) {
        this.username = getUsername(workout.owner, users);
        this.strength = new pointBreakdownCategory();
        this.cardio = new pointBreakdownCategory();
        this.wellness = new pointBreakdownCategory();
        this.usp = new pointBreakdownCategory();
        this.totalPoints = 0;
        this.rank = 0;
        this.owner = workout.owner;
        this.lastworkout = dayjs('1/1/1900');//initial state for calcing multiplier
        this.multiplier = 0;
        this.id = rowcnt;
    }
}

class pointBreakdownCategory {
    constructor() {
        this.points = 0;//overall points;
        this.score = 0;//total points of workouts
        this.rank = 0;
        this.disp = 0;
        this.avgIntensity = 0;
        this.totalIntensity = 0;
        this.avgDuration = 0;
        this.totalDuration = 0;
        this.workoutsCnt = 0;
    };

    setAverages(){
        this.avgDuration = (this.totalDuration/this.workoutsCnt).toFixed(2);
        this.avgIntensity = (this.totalIntensity/this.workoutsCnt).toFixed(2);
    }
}

export { calcPoints, getPointsBreakdown, calcAllPoints }