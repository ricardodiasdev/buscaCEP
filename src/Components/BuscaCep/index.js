import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import api from "../../services/api";

const BuscaCEP = () => {
  const [cep, setCep] = useState({});

  useEffect(() => {
    async function buscarCEP() {
      const response = await api.get("58410367/json/");
      setCep(response.data);
    }
    buscarCEP();
  }, []);

  return (
    <View>
      <Text>{cep.cep}</Text>
    </View>
  );
};

export default BuscaCEP;

const styles = StyleSheet.create({});
