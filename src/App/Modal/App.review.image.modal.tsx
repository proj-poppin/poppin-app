
import React from "react";
import {useAppStore} from "../../Zustand/App/app.zustand";
import shallow from "zustand/shallow";
import ImageViewer from "react-native-image-zoom-viewer";
import styled from "styled-components/native";
import {ModalContentContainer} from "../../Component/Modal";
import {moderateScale} from "../../Util";



export const AppReviewImageModal = () => {
    const {appModalProps,setAppModalVisible} =
        useAppStore(
            state => ({
                appModalProps : state.appModalProps,
                setAppModalVisible: state.setAppModalVisible,
            }),
            shallow,
        );

    const imageInfos = appModalProps?.appModalImageUrls?.map(url =>({url}));
    const index = appModalProps?.appModalImageIndex || 0;

    const renderIndex = (currentIndex:number|undefined, totalCount:number|undefined) => {
        return (
            <IndexContainer>
                <IndexText>
                    {(currentIndex || 0)} / {totalCount || imageInfos?.length}
                </IndexText>
            </IndexContainer>
        );
    };

    return (
            <ModalContentContainer style={{width:'100%',height:'100%',padding:0,paddingBottom:0}}>
                <ImageViewer
                    imageUrls={imageInfos}
                    index={index}
                    enableSwipeDown={true}
                    onSwipeDown={() => setAppModalVisible(false)}
                    renderIndicator={(currentIndex, totalCount) => renderIndex(currentIndex, totalCount)}
                />
            </ModalContentContainer>
    );
};

const IndexContainer = styled.View`
  position: absolute;
  top: 50px; // 인덱스 표시 위치 조정
  left: 0;
  right: 0;
  align-items: center;
`;

const IndexText = styled.Text`
  color: white;
    font-size: ${moderateScale(14)}px;
`;
