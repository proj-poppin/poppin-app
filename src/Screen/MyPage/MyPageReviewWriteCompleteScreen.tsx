import React from 'react';
import {Text, View, FlatList, ActivityIndicator} from 'react-native';
import useGetWriteCompleteReviewList from '../../hooks/myPage/useGetWriteCompleteReviewList.tsx';

export function MyPageReviewWriteCompleteScreen() {
  const {loading, error, data, refetch} = useGetWriteCompleteReviewList();

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1, padding: 16}}>
      <FlatList
        data={data}
        keyExtractor={item => item.reviewId.toString()}
        renderItem={({item}) => (
          <View style={{marginBottom: 16}}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>{item.name}</Text>
            <Text>Review ID: {item.reviewId}</Text>
            <Text>Popup ID: {item.popupId}</Text>
            <Text>Certified: {item.isCertificated ? 'Yes' : 'No'}</Text>
            <Text>Created At: {item.createdAt.toLocaleString()}</Text>
            <Text>Image: {item.imageList[0]}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No reviews found.</Text>}
        onRefresh={refetch}
        refreshing={loading}
      />
    </View>
  );
}
