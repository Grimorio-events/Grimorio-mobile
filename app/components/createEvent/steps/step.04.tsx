import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import React, { useEffect, useState } from "react";
import { colors } from "@/app/styles/colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import useFormEventStore from "@/app/stores/formEventStore";

interface StepComponentProps {
  updateStepValidity: (isValid: boolean) => void;
}

interface DateTimePickerEvent {
  nativeEvent: {
    timestamp: number;
  };
  type: string; // Ejemplo, 'set' | 'dismissed'
}

type PickerMode = "date" | "time";

const DateEvent: React.FC<StepComponentProps> = ({ updateStepValidity }) => {
  const { stateFormEvent, updateFormEvent } = useFormEventStore();

  const [date, setDate] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [dateEndTicket, setDateEndTicket] = useState(new Date());
  const [mode, setMode] = useState<PickerMode>("date");
  const [show, setShow] = useState(false);
  const [isSettingEnd, setIsSettingEnd] = useState(false);
  const [isSettingTicketEnd, setIsSettingTicketEnd] = useState(false);
  const [capacity, setCapacity] = useState(0);
  const [price, setPrice] = useState(0);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShow(false);
    const currentDate = selectedDate || new Date(event.nativeEvent.timestamp);

    if (isSettingEnd) {
      setDateEnd(currentDate);
      updateFormEvent("eventEndDate", currentDate);
    } else if (isSettingTicketEnd) {
      setDateEndTicket(currentDate);
      updateFormEvent("ticketEndDate", currentDate);
    } else {
      setDate(currentDate);
      updateFormEvent("eventDate", currentDate);
    }

    setIsSettingEnd(false);
    setIsSettingTicketEnd(false);
  };

  const showMode = (currentMode: PickerMode, isEnd: boolean = false) => {
    setShow(true);
    setMode(currentMode);
    setIsSettingEnd(isEnd);
  };

  const showDatepicker = (isEnd: boolean = false) => {
    showMode("date", isEnd);
  };

  const showTimepicker = (isEnd: boolean = false) => {
    showMode("time", isEnd);
  };

  const showTicketEndDatePicker = () => {
    setIsSettingEnd(false);
    setIsSettingTicketEnd(true); // Establecer este indicador para la fecha límite de venta de tickets
    showMode("date");
  };

  const handleCapacityChange = (num: string) => {
    const number = parseInt(num, 10);
    setCapacity(isNaN(number) ? 0 : number);
    updateFormEvent("totalCapacity", number);
    updateFormEvent("availableTickets", number);
  };

  const handlePriceChange = (num: string) => {
    const number = parseFloat(num);
    setPrice(isNaN(number) ? 0 : number);
    updateFormEvent("ticketPrice", number);
  };

  const isValidStep = () => {
    const totalCapacity = (stateFormEvent.totalCapacity ?? 0) > 0;
    const availableTickets = (stateFormEvent.availableTickets ?? 0) > 0;

    const eventDate = stateFormEvent.eventDate
      ? new Date(stateFormEvent.eventDate)
      : null;
    const eventEndDate = stateFormEvent.eventEndDate
      ? new Date(stateFormEvent.eventEndDate)
      : null;

    const isEventDateValid = eventDate ? !isNaN(eventDate.getTime()) : false;
    const isEventEndDateValid = eventEndDate
      ? !isNaN(eventEndDate.getTime())
      : false;

    return (
      totalCapacity &&
      availableTickets &&
      isEventDateValid &&
      isEventEndDateValid
    );
  };

  useEffect(() => {
    const isValid = isValidStep();
    updateStepValidity(isValid);
  }, [
    stateFormEvent.totalCapacity,
    stateFormEvent.availableTickets,
    stateFormEvent.eventDate,
    stateFormEvent.eventEndDate,
  ]);

  return (
    <Animated.View
      style={styles.container}
      entering={FadeInRight}
      exiting={FadeOutLeft}
    >
      <Text style={styles.title}>Datos del Evento</Text>
      <SafeAreaView>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.containerDate}>
            <TouchableOpacity
              style={styles.selectDate}
              onPress={() => showDatepicker(false)}
            >
              <Text style={styles.label}>Fecha del evento:</Text>
              <Text style={styles.dateInput}>
                {date instanceof Date
                  ? `${date.getDate()} / ${
                      date.getMonth() + 1
                    } / ${date.getFullYear()}`
                  : "Invalid date"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.selectDate}
              onPress={() => showTimepicker(false)}
            >
              <Text style={styles.label}>Hora de inicio del evento: </Text>
              <Text style={styles.dateInput}>
                {date instanceof Date
                  ? `${date.getHours()} : ${date.getMinutes()}`
                  : "Invalid Time"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.selectDate}
              onPress={() => showDatepicker(true)}
            >
              <Text style={styles.label}>Fecha de terminación del evento:</Text>
              <Text style={styles.dateInput}>
                {dateEnd instanceof Date
                  ? `${dateEnd.getDate()} / ${
                      dateEnd.getMonth() + 1
                    } / ${dateEnd.getFullYear()}`
                  : "Invalid date"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.selectDate}
              onPress={() => showTimepicker(true)}
            >
              <Text style={styles.label}>Hora de terminación del evento: </Text>
              <Text style={styles.dateInput}>
                {dateEnd instanceof Date
                  ? `${dateEnd.getHours()} : ${dateEnd.getMinutes()}`
                  : "Invalid Time"}
              </Text>
            </TouchableOpacity>
            <View style={styles.selectDate}>
              <Text style={styles.label}>Numero de Tickets: </Text>
              <TextInput
                keyboardType="numeric"
                style={styles.dateInput}
                value={capacity.toString()}
                onChangeText={handleCapacityChange}
              />
            </View>
            <View style={styles.selectDate}>
              <Text style={styles.label}>Precio por ticket: </Text>
              <View style={styles.priceContainer}>
                <Text style={styles.currencySymbol}>$</Text>
                <TextInput
                  placeholder="0.00"
                  keyboardType="numeric"
                  style={styles.priceInput}
                  value={price.toString()}
                  onChangeText={handlePriceChange}
                />
              </View>
            </View>
            <Text style={{ width: "80%", paddingTop: 20 }}>
              Si en el transcurso del evento aun deseas habilitar la compra de
              tickets, modifica la fecha siguiente:
            </Text>
            <TouchableOpacity
              style={styles.selectDate}
              onPress={showTicketEndDatePicker}
            >
              <Text style={styles.label}>
                Fecha limite para venta de tickets:
              </Text>
              <Text style={styles.dateInput}>
                {dateEndTicket instanceof Date
                  ? `${dateEndTicket.getDate()} / ${
                      dateEndTicket.getMonth() + 1
                    } / ${dateEndTicket.getFullYear()}`
                  : "Invalid date"}
              </Text>
            </TouchableOpacity>
          </View>
          {show && (
            <DateTimePicker
              // testID="dateTimePicker"
              value={date}
              is24Hour={false}
              mode={mode}
              onChange={onChange}
            />
          )}
        </ScrollView>
      </SafeAreaView>
    </Animated.View>
  );
};

export default DateEvent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.background,
    padding: 30,
  },
  scrollContainer: {
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 30,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "500",
  },
  contentText: {
    fontSize: 16,
    marginVertical: 10,
    letterSpacing: 1,
    lineHeight: 20,
  },
  containerDate: {
    width: "100%",
    alignItems: "center",
    marginBottom: 30,
  },
  selectDate: {
    width: "80%",
    marginVertical: 8,
  },
  label: {
    color: colors.grey,
    fontSize: 14,
    fontWeight: "300",
  },
  dateInput: {
    borderColor: colors.grey,
    borderBottomWidth: 1,
    padding: 10,
    fontSize: 18,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: colors.grey,
    borderBottomWidth: 1,
    padding: 10,
  },
  currencySymbol: {
    // Estilos para el símbolo de moneda.
  },
  priceInput: {
    fontSize: 18,
    marginLeft: 10,
  },
});
