import React, { useState } from "react";
import {
    Stack,
    OutlinedInput,
    InputLabel,
    MenuItem,
    Chip,
    Select,
    FormControl,
    Autocomplete,
    TextField,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";


const MultiSelect = ({ names, selectedNames, setSelectedNames }) => {
    return (
        <FormControl sx={{ width: '100%'}}>
            <Select
                multiple
                value={selectedNames}
                onChange={(e) => setSelectedNames(e.target.value)}
                // input={<OutlinedInput label="Multiple Select" />}
                renderValue={(selected) => (
                    <Stack gap={1} direction="row" flexWrap="wrap">
                        {selected.map((value) => (
                            <Chip
                                key={value}
                                label={value}
                                onDelete={() =>
                                    setSelectedNames(
                                        selectedNames.filter((item) => item !== value)
                                    )
                                }
                                deleteIcon={
                                    <CancelIcon
                                        onMouseDown={(event) => event.stopPropagation()}
                                    />
                                }
                            />
                        ))}
                    </Stack>
                )}
            >
                {names.map((name) => (
                    <MenuItem
                        key={name}
                        value={name}
                        sx={{ justifyContent: "space-between" }}
                    >
                        {name}
                        {selectedNames.includes(name) ? <CheckIcon color="info" /> : null}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default MultiSelect;