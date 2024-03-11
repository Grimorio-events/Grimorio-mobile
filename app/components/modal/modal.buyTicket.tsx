import { colors } from "@/app/styles/colors";
import { buyTicket } from "@/app/utils/ticket.service";
import { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ModalBuyProps {
  event: any;
  totalCost: string;
  count: number;
  eventId: string;
  token: string;
  sessionId: string;
  setModalSate: (isValid: boolean) => void;
  userId?: string;
  handleBuySuccess: () => void;
}

const ModalBuyTicket: React.FC<ModalBuyProps> = ({
  event,
  totalCost,
  count,
  eventId,
  token,
  sessionId,
  setModalSate,
  userId,
  handleBuySuccess,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const hanleBuyTickets = async (count: number, eventId: string) => {
    if (token && sessionId && userId) {
      setIsLoading(true);
      setError("");
      try {
        const buyTickets = await buyTicket(
          count,
          eventId,
          token,
          sessionId,
          userId
        );

        if (buyTickets.success) {
          handleBuySuccess();
          console.log("Buy success:", buyTickets);
        } else {
          console.error("Error Buy Tickets:", buyTickets.message);
          setError("Error al realizar la compra. Por favor, intenta de nuevo.");
        }
      } catch (error) {
        console.error("Error Buy Tickets:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <View style={styles.modalView}>
      {!isLoading ? (
        <>
          <View style={styles.containerModal}>
            <View style={styles.InfoModal}>
              <Text style={styles.textInfoModal}>Valor por ticket: </Text>
              <Text style={styles.textInfoModal}>${event?.ticketPrice}</Text>
            </View>
            <View style={styles.InfoModal}>
              <Text style={styles.textInfoModal}>Cantidad de tickets: </Text>
              <Text style={styles.textInfoModal}>{count}</Text>
            </View>
            <View style={styles.InfoModal}>
              <Text style={styles.textTotalModal}>Total: </Text>
              <Text style={styles.textTotalModal}>${totalCost}</Text>
            </View>
          </View>
          <View style={styles.btnModal}>
            <TouchableOpacity
              style={styles.btnCancel}
              onPress={() => setModalSate(false)}
            >
              <Text style={styles.textBtn}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnBuy}
              onPress={() => hanleBuyTickets(count, eventId)}
            >
              <Text style={styles.textBtn}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.containerLoading}>
          <Text style={styles.textCompra}>Procesando la compra...</Text>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerLoading: {
    width: 250,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  textCompra: {
    fontSize: 16,
    paddingBottom: 20,
  },
  btnBuy: {
    backgroundColor: colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },
  btnCancel: {
    backgroundColor: colors.alertSoft,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },
  textBtn: {
    color: colors.white,
    fontWeight: "700",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  btnModal: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  containerModal: {
    width: 250,
    paddingBottom: 30,
  },
  InfoModal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textInfoModal: {
    fontSize: 16,
    letterSpacing: 1,
  },
  textTotalModal: {
    fontSize: 16,
    letterSpacing: 1,
    fontWeight: "700",
    marginTop: 20,
  },
});

export default ModalBuyTicket;
