import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://api/doctor";

// -------------------------------------------------
// POST → REGISTRO DE DOCTOR
// -------------------------------------------------

export const registerDoctor = createAsyncThunk(
  "doctor/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error en registro");
    }
  }
);

// -------------------------------------------------
// GET → OBTENER PERFIL DEL DOCTOR
// -------------------------------------------------

export const getDoctorProfile = createAsyncThunk(
  "doctor/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error al obtener datos");
    }
  }
);

// -------------------------------------------------
// PATCH → ACTUALIZAR PERFIL DEL DOCTOR
// -------------------------------------------------

export const updateDoctor = createAsyncThunk(
  "doctor/update",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error al actualizar");
    }
  }
);

// -------------------------------------------------
// SLICE
// -------------------------------------------------

const doctorSlice = createSlice({
  name: "doctor",
  initialState: {
    doctor: null,
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.doctor = action.payload;
      })
      .addCase(registerDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET PROFILE
      .addCase(getDoctorProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDoctorProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.doctor = action.payload;
      })
      .addCase(getDoctorProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE DOCTOR
      .addCase(updateDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.doctor = action.payload;
      })
      .addCase(updateDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default doctorSlice.reducer;
