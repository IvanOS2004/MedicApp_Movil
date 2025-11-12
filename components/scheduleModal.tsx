import { Plus, Trash2, X } from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface RestPeriod {
  start: string;
  end: string;
}

interface DayAvailability {
  day: string;
  active: boolean;
  start: string;
  end: string;
  rests: RestPeriod[];
}

interface ScheduleModalProps {
  visible: boolean;
  onClose: () => void;
  appointments: any[];
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({
  visible,
  onClose,
  appointments,
}) => {
  const daysOfWeek = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  const [availability, setAvailability] = useState<DayAvailability[]>(
    daysOfWeek.map((day) => ({
      day,
      active: true,
      start: "08:00",
      end: "19:00",
      rests: [],
    }))
  );

  const toggleDay = (index: number) => {
    setAvailability((prev) =>
      prev.map((d, i) =>
        i === index ? { ...d, active: !d.active, rests: [] } : d
      )
    );
  };

  const updateTime = (index: number, key: "start" | "end", value: string) => {
    setAvailability((prev) =>
      prev.map((d, i) => (i === index ? { ...d, [key]: value } : d))
    );
  };

  const addRestPeriod = (dayIndex: number) => {
    setAvailability((prev) =>
      prev.map((d, i) =>
        i === dayIndex
          ? {
              ...d,
              rests: [...d.rests, { start: "13:00", end: "14:00" }],
            }
          : d
      )
    );
  };

  const updateRestPeriod = (
    dayIndex: number,
    restIndex: number,
    key: "start" | "end",
    value: string
  ) => {
    setAvailability((prev) =>
      prev.map((d, i) => {
        if (i !== dayIndex) return d;

        const updatedRests = d.rests.map((r, j) =>
          j === restIndex ? { ...r, [key]: value } : r
        );

        return { ...d, rests: updatedRests };
      })
    );
  };

  const removeRestPeriod = (dayIndex: number, restIndex: number) => {
    setAvailability((prev) =>
      prev.map((d, i) => {
        if (i !== dayIndex) return d;
        return {
          ...d,
          rests: d.rests.filter((_, j) => j !== restIndex),
        };
      })
    );
  };

  const validateRest = (
    workStart: string,
    workEnd: string,
    rest: RestPeriod
  ) => {
    const toMinutes = (t: string) => {
      const [h, m] = t.split(":").map(Number);
      return h * 60 + m;
    };

    const startW = toMinutes(workStart);
    const endW = toMinutes(workEnd);
    const startR = toMinutes(rest.start);
    const endR = toMinutes(rest.end);

    if (startR < startW || endR > endW || startR >= endR) return false;
    return true;
  };

  const handleSave = () => {
    for (const day of availability) {
      if (!day.active) continue;
      for (const rest of day.rests) {
        if (!validateRest(day.start, day.end, rest)) {
          Alert.alert(
            "Horario inválido",
            `El descanso de ${day.day} (${rest.start} - ${rest.end}) está fuera del horario laboral (${day.start} - ${day.end}).`
          );
          return;
        }
      }
    }
    Alert.alert(
      "✅ Guardado",
      "Configuración de agenda actualizada correctamente."
    );
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View className="flex-1 bg-teal-50">
        {/* Header */}
        <View className="flex-row justify-between items-center px-4 py-4 shadow-sm bg-white border-b border-teal-100">
          <Text className="text-lg font-semibold text-gray-900">
            Configuración de Agenda
          </Text>
          <TouchableOpacity onPress={onClose}>
            <X size={24} color="#0D9488" />
          </TouchableOpacity>
        </View>

        <ScrollView className="px-4 mt-3">
          {availability.map((day, index) => (
            <View
              key={day.day}
              className="bg-white p-4 rounded-2xl mb-3 border border-teal-100 shadow-sm"
            >
              <View className="flex-row justify-between items-center mb-2">
                <Text className="font-semibold text-gray-800">{day.day}</Text>
                <Switch
                  value={day.active}
                  onValueChange={() => toggleDay(index)}
                  trackColor={{ true: "#14B8A6", false: "#E5E7EB" }}
                />
              </View>

              {day.active ? (
                <>
                  {/* Horario laboral */}
                  <View className="flex-row justify-between mt-2">
                    <View className="flex-1 mr-2">
                      <Text className="text-gray-600 text-sm mb-1">
                        Hora de inicio
                      </Text>
                      <TextInput
                        className="border border-gray-300 rounded-lg p-2 text-gray-800"
                        value={day.start}
                        onChangeText={(t) => updateTime(index, "start", t)}
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="text-gray-600 text-sm mb-1">
                        Hora de fin
                      </Text>
                      <TextInput
                        className="border border-gray-300 rounded-lg p-2 text-gray-800"
                        value={day.end}
                        onChangeText={(t) => updateTime(index, "end", t)}
                      />
                    </View>
                  </View>

                  {/* Descansos */}
                  <View className="mt-4">
                    <View className="flex-row justify-between items-center mb-2">
                      <Text className="text-gray-700 font-medium">
                        Horarios de descanso
                      </Text>
                      <TouchableOpacity
                        onPress={() => addRestPeriod(index)}
                        className="bg-teal-100 px-3 py-1.5 rounded-full border border-teal-200"
                      >
                        <View className="flex-row items-center">
                          <Plus size={16} color="#0D9488" />
                          <Text className="ml-1 text-teal-700 text-sm font-semibold">
                            Agregar
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>

                    {day.rests.length === 0 ? (
                      <Text className="text-gray-400 italic text-sm">
                        No hay descansos configurados
                      </Text>
                    ) : (
                      day.rests.map((rest, restIndex) => (
                        <View
                          key={restIndex}
                          className="flex-row items-center mb-2"
                        >
                          <View className="flex-1 mr-2">
                            <TextInput
                              className="border border-gray-300 rounded-lg p-2 text-gray-800"
                              value={rest.start}
                              onChangeText={(t) =>
                                updateRestPeriod(index, restIndex, "start", t)
                              }
                            />
                          </View>
                          <Text className="mx-1 text-gray-600">—</Text>
                          <View className="flex-1 mr-2">
                            <TextInput
                              className="border border-gray-300 rounded-lg p-2 text-gray-800"
                              value={rest.end}
                              onChangeText={(t) =>
                                updateRestPeriod(index, restIndex, "end", t)
                              }
                            />
                          </View>
                          <TouchableOpacity
                            onPress={() => removeRestPeriod(index, restIndex)}
                            className="p-2"
                          >
                            <Trash2 size={18} color="#DC2626" />
                          </TouchableOpacity>
                        </View>
                      ))
                    )}
                  </View>
                </>
              ) : (
                <Text className="text-gray-500 mt-1 text-sm italic">
                  Día no disponible
                </Text>
              )}
            </View>
          ))}
        </ScrollView>

        {/* Botón Guardar */}
        <TouchableOpacity
          className="bg-teal-700 mx-4 mb-6 py-4 rounded-full items-center"
          onPress={handleSave}
        >
          <Text className="text-white font-semibold text-base">
            Guardar Configuración
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ScheduleModal;
