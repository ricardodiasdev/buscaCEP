import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
} from "react-native";
import React, { useState, useRef } from "react";
import api from "../../services/api";

const BuscaCEP = () => {
  const [dados, setDados] = useState(null);
  const [input, setInput] = useState();

  const inputRef = useRef(null);

  async function buscarCEP() {
    if (input.length !== 8 || input === null) {
      alert("Digite 8 números.");
      return;
    }

    await api
      .get(`${input}/json/`)
      .then((response) => {
        setDados(response.data);
        Keyboard.dismiss();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function limpar() {
    setInput("");
    inputRef.current.focus();
    setDados(null);
  }

  return (
    <SafeAreaView>
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Digite o CEP desejado</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 51234567"
          value={input}
          onChangeText={(texto) => setInput(texto)}
          keyboardType="numeric"
          ref={inputRef}
        />
      </View>

      <View style={styles.btnArea}>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "#1d75cd" }]}
          onPress={buscarCEP}
        >
          <Text style={styles.btnText}>Buscar CEP</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "#cd3e1d" }]}
          onPress={buscarCEP}
        >
          <Text style={styles.btnText} onPress={limpar}>
            Limpar
          </Text>
        </TouchableOpacity>
      </View>
      {dados && (
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>CEP: {dados.cep}</Text>
          <Text style={styles.itemText}>Logradouro: {dados.logradouro}</Text>
          <Text style={styles.itemText}>Bairro: {dados.bairro}</Text>
          <Text style={styles.itemText}>Cidade: {dados.localidade}</Text>
          <Text style={styles.itemText}>Estado: {dados.uf}</Text>
        </View>
      )}
   
    </SafeAreaView>
  );
};

export default BuscaCEP;

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: "center",
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
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  itemText: {
    fontSize: 18,
  },
});
