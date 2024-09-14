import dayjs from "dayjs";
import categoryChoices from "./workoutCategories";
import {
    Stack,
    Button,
} from "@mui/material";
import StrengthIcon from '@mui/icons-material/FitnessCenter';
import CardioIcon from '@mui/icons-material/DirectionsRun';
import WellnessIcon from '@mui/icons-material/SelfImprovement';
import USPIcon from '@mui/icons-material/SportsBar';

  
const workoutsColumns = [
    { field: 'username', headerName: 'Name', width: 100 },
    { field: 'category', headerName: 'Category', width: 100, 
        renderCell: (params) => {
            return getCategoryIcon(params.value.name, params.row.points)
        }
    },
    { field: 'date', headerName: 'Date', width: 100 },
];

const workoutActionColumn = {
    field: 'action',
    headerName: 'Action',
    width: 75,
    sortable: false,
    disableClickEventBubbling: true,

    renderCell: (params) => {
        return (
            <Stack direction="row" spacing={2}>
                <Button variant="outlined" color="warning" size="small" href={`/workout/${params.row.id}`}>Edit</Button>
            </Stack>
        );
    },
}

function getUser(id, users) {
    for (const user of users) {
        if (user.username === id) {
            return user
        }
    }
}

function getCategoryIcon(category) {
    switch(category){
        case "Strength": return <><StrengthIcon></StrengthIcon></>;
        case "Cardio": return <><CardioIcon></CardioIcon></>;
        case "Wellness": return <><WellnessIcon></WellnessIcon></>;
        case "USP": return <><USPIcon></USPIcon></>;
        default: return<></>
    }
}

const workoutsDisp = (workouts, users) => {
    return workouts.map((workout) => {
        const user = getUser(workout.owner, users);
        return {
            id: workout.id,
            username: user && user.profile.username ? user.profile.username : 'Primal',
            date: dayjs(workout.date).format('MM/DD'),
            category: categoryChoices[workout.category - 1],
            activity: workout.activity,
            duration: workout.duration,
            intensity: workout.intensity,
            points: workout.points || 0,
            streak: workout.multiplier || 0,
            note: workout.note
        }
    });
};

const workoutInitialState = {
    pagination: { paginationModel: { pageSize: 5 } },
    sorting: {
      sortModel: [{ field: 'date', sort: 'desc' }],
    }
}


export { workoutsColumns, workoutsDisp, workoutActionColumn, workoutInitialState, getCategoryIcon };