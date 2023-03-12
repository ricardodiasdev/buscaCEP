import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import api from "../../services/api";

const BuscaCEP = () => {
  const [dados, setDados] = useState({});
  const [input, setInput] = useState();

  async function buscarCEP() {
    await api
      .get(`${input}/json/`)
      .then((response) => setDados(response.data))
      .catch((error) => console.log(error));
  }

  return (
    <SafeAreaView >
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Digite o CEP desejado</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 51234567"
          value={input}
          onChangeText={(texto) => setInput(texto)}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.btnArea}>
        <TouchableOpacity style={[styles.btn, { backgroundColor: "#1d75cd"}]} onPress={buscarCEP}>
          <Text style={styles.btnText}>Buscar CEP</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, { backgroundColor: "#cd3e1d"}]} onPress={buscarCEP}>
          <Text style={styles.btnText}>Limpar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>CEP: {dados.cep}</Text>
        <Text style={styles.itemText}>Logradouro: {dados.logradouro}</Text>
        <Text style={styles.itemText}>Complemento: {dados.complemento}</Text>
        <Text style={styles.itemText}>Bairro: {dados.bairro}</Text>
        <Text style={styles.itemText}>Cidade: {dados.localidade}</Text>
        <Text style={styles.itemText}>Estado: {dados.uf}</Text>
      </View>

    </SafeAreaView>
  );
};

export default BuscaCEP;

const styles = StyleSheet.create({
  inputContainer:{
    alignItems: 'center'
  },
  text: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    width: "90%",
    padding: 10,
    fontSize: 18,
  },
  btnArea: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "space-around",
  },
  btn: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
  },
  btnText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
  },
  itemContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  itemText:{
    fontSize: 18
  }
});
