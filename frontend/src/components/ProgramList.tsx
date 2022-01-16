import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemText, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Program } from '../api/models/program';

export default function ProgramList(props: { programs: Program[] }): JSX.Element {
    const { programs } = props;

    return (
        <Paper>
            {programs.length > 0 ? (
                <List>
                    {programs.map(program => (
                        <ListItem key={program.id} disablePadding>
                            <ListItemButton component={RouterLink} to={`/programs/${program.id}`}>
                                <ListItemText primary={program.name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Box sx={{ p: 1 }}>
                    No programs yet.
                </Box>
            )}
        </Paper>
    );
}