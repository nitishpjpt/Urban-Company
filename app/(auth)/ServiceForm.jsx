import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Animated,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Modal,
  StyleSheet,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import useCartStore from "../store/cartStore.js";
import { MaterialIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";
import LocationHeader from "../../components/locationHeader.jsx";
import DateTimePicker, { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

export default function ServiceForm() {
  const { provider } = useLocalSearchParams();
  const parsedProvider = JSON.parse(provider);

  const addToCart = useCartStore((state) => state.addToCart);

  // Form states
  const [workType, setWorkType] = useState("");
  const [details, setDetails] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  // iOS picker state
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);

  // Address modal states
  const [showAddressOptions, setShowAddressOptions] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [addressInputVisible, setAddressInputVisible] = useState(false);
  const [tempAddress, setTempAddress] = useState("");

  // Animation values
  const headerY = useRef(new Animated.Value(-120)).current;
  const formFade = useRef(new Animated.Value(0)).current;
  const formSlide = useRef(new Animated.Value(30)).current;

  const VISIT_CHARGE = 150;

  // Animate header + form
  useEffect(() => {
    Animated.sequence([
      Animated.timing(headerY, {
        toValue: 0,
        duration: 380,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(formFade, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(formSlide, {
          toValue: 0,
          duration: 420,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  // Android: show date picker first, then time picker
  const showDateTimePickerAndroid = () => {
    DateTimePickerAndroid.open({
      value: selectedDate,
      onChange: (event, selectedDateValue) => {
        if (event.type === "dismissed") return;
        const currentDate = selectedDateValue || selectedDate;

        // Now show time picker
        DateTimePickerAndroid.open({
          value: currentDate,
          onChange: (event2, selectedTime) => {
            if (event2.type === "dismissed") return;
            const finalDateTime = new Date(currentDate);
            finalDateTime.setHours(selectedTime.getHours());
            finalDateTime.setMinutes(selectedTime.getMinutes());
            setSelectedDate(finalDateTime);

            const formattedDate = finalDateTime.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            });
            const formattedTime = finalDateTime.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });
            setDate(`${formattedDate} - ${formattedTime}`);
          },
          mode: "time",
          is24Hour: false,
        });
      },
      mode: "date",
      minimumDate: new Date(),
    });
  };

  // Address handling functions
  const handleAddressPress = () => {
    setShowAddressOptions(true);
  };

  const handleManualAddress = () => {
    setShowAddressOptions(false);
    setAddressInputVisible(true);
    setTempAddress(address);
  };

  const handleMapSelection = () => {
    setShowAddressOptions(false);
    setShowMap(true);
    simulateMapSelection();
  };

  const simulateMapSelection = () => {
    setTimeout(() => {
      const mockAddress = "123 Main Street, City, State - 123456";
      setAddress(mockAddress);
      setShowMap(false);
      alert("Location selected from map!");
    }, 1500);
  };

  const saveManualAddress = () => {
    setAddress(tempAddress);
    setAddressInputVisible(false);
  };

  const cancelManualAddress = () => {
    setAddressInputVisible(false);
    setTempAddress("");
  };

  // Add to cart handler
  const handleAdd = () => {
    if (!workType || !address || !date) {
      alert("Please fill all required fields");
      return;
    }

    const cartItem = {
      id: `${parsedProvider.id}-${workType}`,
      name: parsedProvider.name,
      rating: parsedProvider.rating,
      workType,
      details,
      address,
      date,
      price: parsedProvider.price || 0,
    };

    addToCart(cartItem);
    alert("Service added to cart!");
    handleBack();
  };

  // Back button with animation
  const handleBack = () => {
    Animated.parallel([
      Animated.timing(formFade, { toValue: 0, duration: 250, useNativeDriver: true }),
      Animated.timing(formSlide, { toValue: 30, duration: 250, useNativeDriver: true }),
      Animated.timing(headerY, { toValue: -120, duration: 260, useNativeDriver: true }),
    ]).start(() => router.back());
  };

  const inputStyle =
    "border bg-white p-4 rounded-2xl mb-4 text-[15px] border-gray-200";

  return (
    <>
      <LocationHeader />
      <StatusBar style="dark" />

      <View className="flex-1 bg-[#F6F7FB]">
        {/* Animated Header */}
        <Animated.View
          style={{
            height: 130,
            backgroundColor: "#0B61FF",
            borderBottomLeftRadius: 18,
            borderBottomRightRadius: 18,
            paddingTop: 40,
            paddingHorizontal: 84,
            transform: [{ translateY: headerY }],
          }}
        >
          <Text className="text-white text-xl font-semibold">
            Book {parsedProvider.name}
          </Text>
          <Text className="text-blue-100 mt-1 text-sm">
            Fill the details below · ₹{VISIT_CHARGE} visiting charge
          </Text>
        </Animated.View>

        {/* Back Button */}
        <View style={{ position: "absolute", top: 40, left: 14, zIndex: 20 }}>
          <TouchableOpacity
            onPress={handleBack}
            activeOpacity={0.85}
            style={{
              backgroundColor: "rgba(255,255,255,0.95)",
              padding: 8,
              borderRadius: 10,
              elevation: 4,
              shadowColor: "#000",
              shadowOpacity: 0.08,
              shadowOffset: { width: 0, height: 2 },
            }}
          >
            <MaterialIcons name="arrow-back" size={20} color="#FF6B00" />
          </TouchableOpacity>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView
            className="flex-1 p-4"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: 20 }}
          >
            {/* Form with fade + slide */}
            <Animated.View
              style={{
                opacity: formFade,
                transform: [{ translateY: formSlide }],
              }}
            >
              {/* Work Type */}
              <Text className="font-semibold text-[16px] mb-1">Type of Work *</Text>
              <TextInput
                className={inputStyle}
                placeholder="Ex: Wall Painting / Wiring Repair"
                value={workType}
                onChangeText={setWorkType}
              />

              {/* Details */}
              <Text className="font-semibold text-[16px] mb-1">
                Describe Your Work
              </Text>
              <TextInput
                className={inputStyle}
                placeholder="Explain your problem"
                multiline
                numberOfLines={4}
                value={details}
                onChangeText={setDetails}
              />

              {/* Address Field */}
              <Text className="font-semibold text-[16px] mb-1">Address *</Text>

              {addressInputVisible ? (
                <View className="mb-4">
                  <TextInput
                    className={inputStyle}
                    placeholder="Enter your address manually"
                    value={tempAddress}
                    onChangeText={setTempAddress}
                    multiline
                    numberOfLines={3}
                  />
                  <View className="flex-row justify-end mt-2">
                    <TouchableOpacity
                      onPress={cancelManualAddress}
                      className="px-4 py-2 mr-2 rounded-lg"
                    >
                      <Text className="text-gray-600">Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={saveManualAddress}
                      className="bg-[#0B61FF] px-4 py-2 rounded-lg"
                    >
                      <Text className="text-white">Save Address</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <TouchableOpacity
                  className={`${inputStyle} flex-row items-center justify-between`}
                  onPress={handleAddressPress}
                  activeOpacity={0.7}
                >
                  <View className="flex-1">
                    {address ? (
                      <Text className="text-black">{address}</Text>
                    ) : (
                      <Text className="text-gray-400">Tap to add address</Text>
                    )}
                  </View>
                  <MaterialIcons name="edit" size={20} color="#666" />
                </TouchableOpacity>
              )}

              {/* Date & Time Field */}
              <Text className="font-semibold text-[16px] mb-1">
                Preferred Date & Time *
              </Text>
              <TouchableOpacity
                className={`${inputStyle} flex-row items-center justify-between`}
                onPress={() => {
                  Platform.OS === "android"
                    ? showDateTimePickerAndroid()
                    : setShowDateTimePicker(true);
                }}
                activeOpacity={0.7}
              >
                <View className="flex-1">
                  {date ? (
                    <Text className="text-black">{date}</Text>
                  ) : (
                    <Text className="text-gray-400">Select date and time</Text>
                  )}
                </View>
                <MaterialIcons name="calendar-today" size={20} color="#666" />
              </TouchableOpacity>

              {/* Add to Cart Button */}
              <TouchableOpacity
                className="bg-black p-4 rounded-2xl mt-4 shadow-lg"
                onPress={handleAdd}
                activeOpacity={0.8}
              >
                <Text className="text-white text-center font-bold text-lg">
                  Add to Cart
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>

        {/* Address Options Modal */}
        <Modal
          visible={showAddressOptions}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowAddressOptions(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Choose Address Method</Text>
                <TouchableOpacity
                  onPress={() => setShowAddressOptions(false)}
                  style={styles.closeButton}
                >
                  <MaterialIcons name="close" size={24} color="#666" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.optionButton}
                onPress={handleManualAddress}
              >
                <View style={styles.optionIconContainer}>
                  <FontAwesome5 name="pen" size={20} color="#0B61FF" />
                </View>
                <View style={styles.optionTextContainer}>
                  <Text style={styles.optionTitle}>Fill Manually</Text>
                  <Text style={styles.optionSubtitle}>
                    Type your complete address
                  </Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#999" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.optionButton}
                onPress={handleMapSelection}
              >
                <View style={styles.optionIconContainer}>
                  <MaterialIcons name="map" size={24} color="#0B61FF" />
                </View>
                <View style={styles.optionTextContainer}>
                  <Text style={styles.optionTitle}>Select on Map</Text>
                  <Text style={styles.optionSubtitle}>
                    Pin your location on map
                  </Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#999" />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Map View Modal */}
        <Modal
          visible={showMap}
          transparent={false}
          animationType="slide"
          onRequestClose={() => setShowMap(false)}
        >
          <View style={styles.mapContainer}>
            <View style={styles.mapHeader}>
              <TouchableOpacity
                onPress={() => setShowMap(false)}
                style={styles.backButton}
              >
                <MaterialIcons name="arrow-back" size={24} color="#000" />
              </TouchableOpacity>
              <Text style={styles.mapTitle}>Select Location</Text>
              <View style={{ width: 24 }} />
            </View>

            <View style={styles.mapPlaceholder}>
              <Ionicons name="map-outline" size={80} color="#0B61FF" />
              <Text style={styles.mapPlaceholderText}>
                Map View would appear here
              </Text>
              <Text style={styles.mapPlaceholderSubtext}>
                Integrate with React Native Maps or similar
              </Text>

              <TouchableOpacity
                style={styles.selectLocationButton}
                onPress={simulateMapSelection}
              >
                <Text style={styles.selectLocationText}>Select This Location</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* iOS DateTimePicker */}
        {Platform.OS === "ios" && showDateTimePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="datetime"
            display="spinner"
            onChange={(event, selected) => {
              if (!selected) return;
              setSelectedDate(selected);
              const formattedDate = selected.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              });
              const formattedTime = selected.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              });
              setDate(`${formattedDate} - ${formattedTime}`);
              setShowDateTimePicker(false);
            }}
            minimumDate={new Date()}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 30,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  closeButton: {
    padding: 4,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  optionIconContainer: {
    width: 40,
    alignItems: "center",
  },
  optionTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  optionSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  mapContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  mapHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    padding: 8,
  },
  mapTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  mapPlaceholderText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 16,
  },
  mapPlaceholderSubtext: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  selectLocationButton: {
    backgroundColor: "#0B61FF",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 32,
  },
  selectLocationText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
