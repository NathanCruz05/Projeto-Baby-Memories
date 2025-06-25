import { StyleSheet, Text, View } from "react-native";


export default function Momentos(props: any) {
  return (
    <View style={style.container}>
      <View style={style.view2}>
        <View>
          <Text>{props.momento}</Text>
        </View>
        <View>
          <Text>22 de outubro de 2017</Text>
        </View>
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
