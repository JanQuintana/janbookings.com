import React, {useEffect, useState} from "react";
import axios from "axios";
import {format} from "date-fns";
import './App.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {API_BASE_URL} from "./constants";
import {useFormik} from "formik";
import {MenuItem} from "@mui/material";

function App() {
    const [bookings, setBookings] = useState([]);
    const [editingBooking, setEditingBooking] = useState(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openAddDialog, setOpenAddDialog] = useState(false);

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}bookings`);
            setBookings(response.data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    const deleteBooking = async (id) => {
        await axios.delete(`${API_BASE_URL}booking/delete/${id}`);
        await loadBookings();
    };

    const createBooking = async () => {
        setOpenAddDialog(true);
    };

    const openEditDialogWithBooking = (booking) => {
        setEditingBooking(booking);
        setOpenEditDialog(true);
    };

    const closeEditDialog = () => {
        setEditingBooking(null);
        setOpenEditDialog(false);
        formikAdd.resetForm();
    };

    const closeAddDialog = () => {
        setOpenAddDialog(false);
        formikAdd.resetForm();
    };

    const formikEdit = useFormik({
        initialValues: {
            status: "",
            description: "",
        },
        onSubmit: async (values) => {
            console.log(values);
            if (editingBooking) {
                const updatedBooking = {
                    ...editingBooking,
                    status: values.status,
                    description: values.description,
                };
                try {
                    await axios.put(
                        `${API_BASE_URL}booking/${editingBooking.id}`,
                        updatedBooking
                    );
                    await loadBookings();
                    closeEditDialog();
                } catch (error) {
                    console.error("Error updating booking:", error);
                }
            }
        },
    });

    const formikAdd = useFormik({
        initialValues: {
            status: "Open",
            description: "New Booking",
        },
        onSubmit: async (values) => {
            console.log(values);
            try {
                await axios.post(`${API_BASE_URL}booking/create`, values);
                await loadBookings();
                closeAddDialog();
            } catch (error) {
                console.error("Error creating booking:", error);
            }
        },
    });

    useEffect(() => {
        // Update formik initialValues when editingBooking changes
        if (editingBooking) {
            formikEdit.setValues({
                status: editingBooking.status,
                description: editingBooking.description,
            });
        }
    }, [editingBooking]);

    return (
        <div className="App">
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                marginBottom: '20px'
            }}>
                <div style={{
                    display: 'flex',
                    width: '90%',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <h1>JAN BOOKINGS</h1>
                    <Button onClick={createBooking} variant="contained">Add Booking</Button>
                </div>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="center">Created at</TableCell>
                            <TableCell align="center">Options</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bookings.map((booking) => (
                            <TableRow
                                key={booking.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell align="center">{booking.status}</TableCell>
                                <TableCell align="center">{booking.description}</TableCell>
                                <TableCell align="center">
                                    {format(new Date(booking.createdAt), "dd/MM/yyyy")}
                                </TableCell>
                                <TableCell align="center">
                                    <EditIcon cursor="pointer" onClick={() => openEditDialogWithBooking(booking)}/>
                                    <DeleteIcon cursor="pointer" onClick={() => deleteBooking(booking.id)}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openEditDialog} onClose={closeEditDialog}>
                <DialogTitle>Edit Booking</DialogTitle>
                <DialogContent>
                    <form onSubmit={formikEdit.handleSubmit}>
                        <TextField
                            label="Status"
                            fullWidth
                            select
                            name="status"
                            value={formikEdit.values.status}
                            onChange={formikEdit.handleChange}
                            style={{marginTop: '15px'}}
                        >
                            <MenuItem value="Open">Open</MenuItem>
                            <MenuItem value="Finished">Finished</MenuItem>
                            <MenuItem value="On Hold">On Hold</MenuItem>
                        </TextField>
                        <TextField
                            label="Description"
                            fullWidth
                            name="description"
                            value={formikEdit.values.description}
                            onChange={formikEdit.handleChange}
                            style={{marginTop: '30px'}}
                        />
                        <DialogActions>
                            <Button onClick={closeEditDialog} color="primary">
                                Cancel
                            </Button>
                            <Button type="submit" color="primary">
                                Save
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={openAddDialog} onClose={closeAddDialog}>
                <DialogTitle>Add Booking</DialogTitle>
                <DialogContent>
                    <form onSubmit={formikAdd.handleSubmit}>
                        <TextField
                            label="Status"
                            fullWidth
                            select
                            name="status"
                            value={formikAdd.values.status}
                            onChange={formikAdd.handleChange}
                            style={{marginTop: '15px'}}
                        >
                            <MenuItem value="Open">Open</MenuItem>
                            <MenuItem value="Finished">Finished</MenuItem>
                            <MenuItem value="On Hold">On Hold</MenuItem>
                        </TextField>
                        <TextField
                            label="Description"
                            fullWidth
                            name="description"
                            value={formikAdd.values.description}
                            onChange={formikAdd.handleChange}
                            style={{marginTop: '30px'}}
                        />
                        <DialogActions>
                            <Button onClick={closeAddDialog} color="primary">
                                Cancel
                            </Button>
                            <Button type="submit" color="primary">
                                Add
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default App;
