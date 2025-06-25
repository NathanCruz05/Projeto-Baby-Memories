import { StyleSheet, Text, View } from "react-native";


export default function Momentos() {
  return (
    <View style={style.container}>

      <View style={style.view2}>
        <View>
          <Text>Nascimento</Text>
        </View>
        <View>
          <Text>22 de outubro de 2017</Text>
        </View>
      </View>

      <View style={style.espaco}></View>

      <View style={style.view2}>
        <View><Text>Nascimento</Text></View>
        <View><Text>22 de outubro de 2017</Text></View>
      </View>

      <View style={style.espaco}></View>

      <View style={style.view2}>
        <Text>Nascimento</Text>
        <Text>22 de outubro de 2017</Text>
      </View>

       <View style={style.espaco}></View>

      <View style={style.view2}>
        <Text>Nascimento</Text>
        <Text>22 de outubro de 2017</Text>
      </View>

    </View>
  );
}
const style = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  view2: {
    backgroundColor: "#F2CECE",
    textAlign: "left",
    borderStyle: "solid",
    borderRadius: 20,
    padding: 15,
    width: 300,
    height: 100,
  },
  espaco: {
    height: 15
  }
})
