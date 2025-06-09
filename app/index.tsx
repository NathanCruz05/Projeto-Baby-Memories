import { StyleSheet, View } from "react-native";
import Momentos from './Components/box';
import StyleBotao from './Components/StyleBotao';

export default function Index() {
  return (
     <View style={style.container}>
         <View>
           <StyleBotao />
         </View>
           <Momentos/>
   
       </View>
  );
}
const style = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  texto: {
    fontSize: 40, 
    fontWeight:"bold"
  },
  view2: {
    backgroundColor: "#c9c8f2",
    alignItems: "center",
    textAlign: "center",
    borderStyle: "solid",
    borderRadius: 50,
    padding: 13,
    width: 185,
    height: 50,


  }
})
