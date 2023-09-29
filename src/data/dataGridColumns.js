import dayjs from "dayjs";
import categoryChoices from "./workoutCategories";
import {
    Stack,
    Button,
} from "@mui/material";
  
const workoutsColumns = [
    { field: 'username', headerName: 'Name', width: 150 },
    { field: 'date', headerName: 'Date', width: 100 },
    { field: 'category', headerName: 'Category', width: 100 },
    { field: 'duration', headerName: 'Duration', width: 100 },
    { field: 'intensity', headerName: 'Intensity', width: 100 },
    { field: 'points', headerName: 'Points', width: 100 },
    { field: 'streak', headerName: 'Streak', width: 100 },
    { field: 'note', headerName: 'Note', width: 100 },
];

const workoutActionColumn = {
    field: 'action',
    headerName: 'Action',
    width: 180,
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

const workoutsDisp = (workouts, users) => {
    return workouts.map((workout) => {
        const user = getUser(workout.owner, users);
        return {
            id: workout.id,
            username: user && user.profile.username ? user.profile.username : 'Primal',
            date: dayjs(workout.date).format('MM/DD/YYYY'),
            category: categoryChoices[workout.category - 1].name,
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


export { workoutsColumns, workoutsDisp, workoutActionColumn, workoutInitialState };