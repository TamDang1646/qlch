import React from "react";

import {
  Animated,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import R from "../R";

interface SelectListProps {
  /**
  * Fn to set Selected option value which will be stored in your local state
  */
  setSelected: React.Dispatch<React.SetStateAction<undefined>>,

  /**
  * Placeholder text that will be displayed in the select box
  */
  placeholder?: string,

  /**
  * Additional styles for select box
  */
  boxStyles?: ViewStyle,

  /**
  *  	Additional styles for text of select box
  */
  inputStyles?: ViewStyle,

  /**
  *  	Additional styles for dropdown scrollview
  */
  dropdownStyles?: ViewStyle,

  /**
  *  	Additional styles for dropdown Animated.View
  */
  contentViewStyle?: ViewStyle,

  /**
  *  Additional styles for dropdown list item
  */
  dropdownItemStyles?: ViewStyle,

  /**
  * Additional styles for list items text
  */
  dropdownTextStyles?: ViewStyle,

  /**
  * Maximum height of the dropdown wrapper to occupy
  */
  maxHeight?: number,

  /**
  * Data which will be iterated as options of select list
  */
  data: any[],

  /**
  * Pass any JSX to this prop like Text, Image or Icon to show instead of search icon
  */
  searchicon?: JSX.Element,

  /**
  *  Pass any JSX to this prop like Text, Image or Icon to show instead of chevron icon
  */
  arrowicon?: JSX.Element,

  /**
  * set to false if you dont want to use search functionality
  */
  search?: boolean

  /**
  * Trigger an action when option is selected
  */
  onSelect?: () => void

  /**
   * Clear selected value
   */
  clearValue?: boolean

}

const SelectList: React.FC<SelectListProps> = ({
  setSelected,
  placeholder,
  boxStyles,
  inputStyles,
  dropdownStyles,
  dropdownItemStyles,
  dropdownTextStyles,
  maxHeight,
  data,
  searchicon = false,
  arrowicon = false,
  search = true,
  onSelect = () => { },
  clearValue
}) => {


  const [_firstRender, _setFirstRender] = React.useState<boolean>(true);
  const [dropdown, setDropdown] = React.useState<boolean>(false);
  const [selectedval, setSelectedVal] = React.useState<any>("");
  const [height, setHeight] = React.useState<number>(200)
  const [filtereddata, setFilteredData] = React.useState(data)
  const animatedvalue = React.useRef(new Animated.Value(0)).current;
  const [locationX, setLocationX] = React.useState(0)
  const [locationY, setLocationY] = React.useState(0)
  const buttonRef = React.useRef();
  const slidedown = () => {
    setDropdown(true)
    Animated.timing(animatedvalue, {
      toValue: height,
      duration: 200,
      useNativeDriver: false,

    }).start()
  }
  const slideup = () => {
    Animated.timing(animatedvalue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,

    }).start(() => setDropdown(false))
  }

  React.useEffect(() => {
    if (maxHeight)
      setHeight(maxHeight)
  }, [maxHeight])


  React.useEffect(() => {
    setFilteredData(data);
  }, [data])


  React.useEffect(() => {
    if (_firstRender) {
      _setFirstRender(false);
      return;
    }
    onSelect()
  }, [selectedval])
  React.useEffect(() => {
    if (clearValue) {
      setSelected("")
      setSelectedVal("")
      slideup()
    }
    // setClearSetValue(false)
  }, [clearValue])
  // console.log("clear", clearValue);

  const showContent = () => {
    return (
      <R.Modal
        isVisible={dropdown}
        onBackdropPress={() => setDropdown(false)}
        style={{ justifyContent: "center", alignItems: "center" }}
        backdropTransitionOutTiming={0}
        animationIn="slideInDown"
        animationOutTiming={100}
        animationOut="slideOutUp"
      >
        <View style={[styles.dropdown, dropdownStyles, { maxHeight: 300, position: "absolute", left: locationX, top: locationY }]} >

          <TextInput
            placeholder='search'
            onChangeText={val => {
              let result = data.filter(item => {
                val.toLowerCase();
                let row = item.value.toLowerCase()
                return row.search(val.toLowerCase()) > -1;
              });
              setFilteredData(result)
            }}
            style={[{ padding: 8, height: R.verticalScale(30), flex: 1, margin: R.verticalScale(8), borderWidth: 1, borderRadius: 8, borderColor: "#BEB9B9" }, inputStyles]}
            inlineImageLeft={"search-icon"}
            inlineImagePadding={10}
          />
          <ScrollView contentContainerStyle={{ paddingVertical: 10, }} nestedScrollEnabled={true}>
            {
              (filtereddata.length >= 1)
                ?
                <>
                  {filtereddata.map((item, index) => {
                    let key = item.key ?? item.value ?? item;
                    let value = item.value ?? item;
                    return (
                      <TouchableOpacity style={[styles.option, dropdownItemStyles]} key={index} onPress={() => {
                        setSelected(key)
                        setSelectedVal(value)
                        slideup()
                        setTimeout(() => setFilteredData(data), 800)

                      }}>
                        <Text style={[{ fontSize: R.verticalScale(12) }, dropdownTextStyles]}>{value}</Text>
                      </TouchableOpacity>
                    )
                  })}
                </>
                :
                <TouchableOpacity style={[styles.option, dropdownItemStyles]} onPress={() => {
                  setSelected("")
                  setSelectedVal("")
                  slideup()
                  setTimeout(() => setFilteredData(data), 800)
                }}>
                  <Text style={dropdownTextStyles}> No data found</Text>
                </TouchableOpacity>
            }
          </ScrollView>
        </View>

      </R.Modal>
    )
  }
  const openDrop = (event: UIEvent) => {
    buttonRef.current.measure((fx, fy, w, h, px, py) => {
      // console.log("location", fx, fy, w, h, px, py)
      if (Platform.OS == "ios") {
        setLocationX(px - 22);
        setLocationY(py + 24);
      } else {
        setLocationX(px - 20);
        setLocationY(py);
      }
      // if (R.DEVICE_HEIGHT - 18 < py + h + 44) {
      //   setLocationX(px);
      //   setLocationY(py - 2 - 44);
      // } else {
      //   setLocationX(px);
      //   setLocationY(py + h + 2);
      // }
    })
    // console.log("locationDrop", locationX, locationY);
    // setLocationX(event.locationX)
    !dropdown ? slidedown() : slideup()
  }
  return (
    <View style={{ position: "relative", }} >
      {
        // (dropdown && search)
        //   ?
        //   <View style={[styles.wrapper, boxStyles, { borderWidth: 1 }]}>
        //     <View style={{ flexDirection: "row", alignItems: "center" }}>
        //       {
        //         (!searchicon)
        //           ?
        //           <Image
        //             source={R.images.image_search}
        //             resizeMode='contain'
        //             style={{ width: 20, height: 20, marginRight: 7 }}
        //           />
        //           :
        //           searchicon
        //       }

        //       <TextInput
        //         placeholder='search'
        //         onChangeText={val => {
        //           let result = data.filter(item => {
        //             val.toLowerCase();
        //             let row = item.value.toLowerCase()
        //             return row.search(val.toLowerCase()) > -1;
        //           });
        //           setFilteredData(result)
        //         }}
        //         style={[{ padding: 0, height: R.verticalScale(20), flex: 1, marginRight: R.verticalScale(8) }, inputStyles]}
        //       />
        //       <TouchableWithoutFeedback
        //         onPress={slideup}
        //       >
        //         <R.Icon name="No" style={{}} size={14} color={"#707070"} />
        //       </TouchableWithoutFeedback>
        //     </View>

        //   </View>
        //   :
        <TouchableOpacity style={[styles.wrapper, boxStyles]}
          ref={buttonRef}
          onPress={(event: UIEvent) => openDrop(event)}
        // onPress={() => { !dropdown ? slidedown() : slideup() }}
        >
          <Text style={[{
            // overflow: "hidden"
            width: "80%",
            fontSize: R.verticalScale(14)
          }, inputStyles]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {(selectedval == "") ? (placeholder) ? placeholder : "Select option" : selectedval}
          </Text>
          {
            (!arrowicon)
              ?
              <Image
                source={R.images.icon_arrow}
                resizeMode='contain'
                style={{ width: 20, height: 20, }}
              />
              :
              arrowicon
          }

        </TouchableOpacity>
      }

      {/* {
        (dropdown)
          ?
          <Animated.View style={[{ maxHeight: animatedvalue, position: "absolute" }, contentViewStyle]} >
            <ScrollView style={[styles.dropdown, dropdownStyles]} contentContainerStyle={{ paddingVertical: 10, }} nestedScrollEnabled={true}>
              {
                (filtereddata.length >= 1)
                  ?
                  filtereddata.map((item, index) => {
                    let key = item.key ?? item.value ?? item;
                    let value = item.value ?? item;
                    return (
                      <TouchableOpacity style={[styles.option, dropdownItemStyles]} key={index} onPress={() => {
                        setSelected(key)
                        setSelectedVal(value)
                        slideup()
                        setTimeout(() => setFilteredData(data), 800)

                      }}>
                        <Text style={dropdownTextStyles}>{value}</Text>
                      </TouchableOpacity>
                    )
                  })
                  :
                  <TouchableOpacity style={[styles.option, dropdownItemStyles]} onPress={() => {
                    setSelected("")
                    setSelectedVal("")
                    slideup()
                    setTimeout(() => setFilteredData(data), 800)
                  }}>
                    <Text style={dropdownTextStyles}> No data found</Text>
                  </TouchableOpacity>
              }



            </ScrollView>
          </Animated.View>
          :
          null
      } */}

      {showContent()}
    </View >
  )
}

export default SelectList;

const styles = StyleSheet.create({
  wrapper: { borderWidth: 1, borderRadius: 10, borderColor: "gray", paddingHorizontal: 8, paddingVertical: 8, flexDirection: "row", justifyContent: "space-evenly" },
  dropdown: { borderWidth: 1, borderRadius: 10, borderColor: "gray", marginTop: 10, backgroundColor: "#FFFFFF" },
  option: { paddingHorizontal: 8, paddingVertical: 8 }
})