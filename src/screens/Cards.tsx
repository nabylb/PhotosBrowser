import {
  Animated,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';

import _ from 'lodash';
import {useFetch} from '../hooks';

const {width, height} = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.47;

const images = [
  'https://images.unsplash.com/photo-1551316679-9c6ae9dec224?w=800&q=80',
  'https://images.unsplash.com/photo-1562569633-622303bafef5?w=800&q=80',
  'https://images.unsplash.com/photo-1503656142023-618e7d1f435a?w=800&q=80',
  'https://images.unsplash.com/photo-1555096462-c1c5eb4e4d64?w=800&q=80',
  'https://images.unsplash.com/photo-1517957754642-2870518e16f8?w=800&q=80',
  'https://images.unsplash.com/photo-1546484959-f9a381d1330d?w=800&q=80',
  'https://images.unsplash.com/photo-1548761208-b7896a6ff225?w=800&q=80',
  'https://images.unsplash.com/photo-1511208687438-2c5a5abb810c?w=800&q=80',
  'https://images.unsplash.com/photo-1548614606-52b4451f994b?w=800&q=80',
  'https://images.unsplash.com/photo-1548600916-dc8492f8e845?w=800&q=80',
];

const Cards = () => {
  const scrollX = useRef<Animated.AnimatedValue>(new Animated.Value(0)).current;
  const [data, setData] = useState<any[]>([]);
  const [previousData, setPreviousData] = useState<any>(null);
  const res = useFetch('Animals');

  useEffect(() => {
    res.refetch();
  }, []);

  useEffect(() => {
    if (res.error) {
      //     showAlert(res.error);
      res.setError(null);
    }
  }, [res, res.error, res.setError]);

  useEffect(() => {
    if (res.data && !_.isEqual(res.data, previousData)) {
      setData(
        res.data.map((item: any, index: number) => {
          return {
            photo: item.urls.regular,
            key: index,
          };
        }),
      );
    }
    setPreviousData(res.data);
  }, [previousData, res.data]);

  console.log(data);
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.FlatList
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        data={data}
        keyExtractor={item => item.key}
        horizontal
        pagingEnabled
        renderItem={({item, index}) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-width * 0.7, 0, width * 0.7],
          });

          return (
            <View
              style={{
                width,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  borderRadius: 18,
                  borderWidth: 12,
                  borderColor: '#FFF',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 20,
                  backgroundColor: '#FFF',
                  elevation: 3,
                }}>
                <View
                  style={{
                    width: ITEM_WIDTH,
                    height: ITEM_HEIGHT,
                    overflow: 'hidden',
                    alignItems: 'center',
                    borderRadius: 18,
                  }}>
                  <Animated.Image
                    source={{uri: item.photo}}
                    style={{
                      width: ITEM_WIDTH * 1.4,
                      height: ITEM_HEIGHT,
                      resizeMode: 'cover',
                      transform: [
                        {
                          translateX,
                        },
                      ],
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  elevation: 3,
                  position: 'absolute',
                  bottom: height - 120,
                  right: ITEM_WIDTH / 4,
                }}>
                <Image
                  source={{uri: item.avatar_url}}
                  style={{
                    height: 60,
                    width: 60,
                    borderRadius: 60,
                    borderColor: '#FFF',
                    borderWidth: 5,
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                  }}
                />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Cards;
