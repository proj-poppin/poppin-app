// import React from 'react';
// import {StyleProp, ViewStyle} from 'react-native';
// import SelectDropdown, {
//   SelectDropdownProps,
// } from 'react-native-select-dropdown';
// import SortingIcon from 'src/Resource/svg/sorting-icon.svg';
// import {moderateScale} from 'src/Util';
//
// /**
//  * SelectDropdown 라이브러리에서 제공하는 Dropdown 컴포넌트에 데이터를 제공할 때
//  * 데이터의 실제 값과 표시되는 값을 다르게 설정할 수 있습니다.
//  * value에는 data의 실제 값을, displayName에는 드롭다운 메뉴 상에 표시될 이름을 넣어주면 됩니다.
//  * @author 도형
//  */
// export type SimpleDropdownDataType<T = void> = {
//   //? <T = void>: 제네릭 타입을 optional 하게 만듭니다
//   value: T | any;
//   displayName: string;
// };
//
// type SimpleDropdownProps<T> = {
//   data: SimpleDropdownDataType<T>[];
//   onSelect: (selectedItem: SimpleDropdownDataType<T>, index: number) => void;
//   props?: Partial<SelectDropdownProps>;
//   style?: StyleProp<ViewStyle>;
// };
//
// /**
//  * @deprecated
//  * CustomDropdown 을 위시한 BorderedDropdown, BorderlessDropdown 등으로 대체되었습니다.
//  * Research.upload.credit.tsx 에 코드가 남아있는데, 추후 프로젝트 업로드 과정에 사진 업로드 기능이 추가되면 지웁니다.
//  *
//  * Dropdown을 편하게 활용하도록 만든 component입니다.
//  *
//  * @caution 제공하는 data의 형태에 주의해주세요.
//  * Dropdown에 넣을 수 있는 값에는 제한이 없지만, 보여지는 이름은 반드시 string이어야 하므로
//  * { value: any, displayName: string } 의 형태를 가진 data 배열만을 받도록 설정되어 있습니다.
//  *
//  * @example
//  * ```
//  * import { SimpleDropdown, SimpleDropdownDataType } from "src/Component/Dropdown";
//  *
//  * function Example(){
//  *  const exampleDropdownData: SimpleDropdownDataType<string>[] = [
//  *    { value: "Korea", displayName: "한국" },
//  *    { value: "Japan", displayName: "일본" },
//  *    { value: "America", displayName: "미국" },
//  *  ];
//  *
//  *  return (
//  *    <SimpleDropdown
//  *      data={exampleDropdownData}
//  *      onSelect={(selectedItem:SimpleDropdownDataType) => {
//  *        ...
//  *      }}
//  *      type="RESEARCH_PURPOSE"
//  *      props={{
//  *        defaultButtonText: "0",
//  *        ...
//  *      }}
//  *    />
//  *  )
//  * }
//  * ```
//  *
//  * @param data dropdown에 들어갈 데이터 array. { value: any, displayName: string } 형태여야 합니다.
//  * @param onSelect 값 선택시 호출 함수
//  * @param props SelectDropdownProps의 값들을 지정할 수 있습니다.
//  *  - buttonStyle: 드롭다운 메뉴 트리거 버튼 스타일
//  *  - dropdownStyle: 드롭다운 메뉴의 모든 row 를 감싸는 container 스타일
//  *  - rowStyle: 드롭다운 메뉴 각 row 의 스타일
//  * 이 외에도 지정할 수 있는 모든 속성들에 대해서는 SelectDropdown 위에서 F12 키를 눌러 해당 문서를 참조하세요.
//  *
//  * @modify 도형
//  */
// export function SimpleDropdown<T>({
//   data,
//   onSelect,
//   props,
// }: SimpleDropdownProps<T>) {
//   const rowTextForSelection = (item: SimpleDropdownDataType<T>) => {
//     return item.displayName;
//   };
//   const buttonTextAfterSelection = (
//     selectedItem: SimpleDropdownDataType<T>,
//   ) => {
//     return selectedItem.displayName;
//   };
//   const renderDropdownIcon = () => {
//     return <SortingIcon style={{marginHorizontal: moderateScale(5)}} />;
//   };
//
//   return (
//     <SelectDropdown
//       data={data}
//       onSelect={onSelect}
//       //? 드롭다운 각 선택지에 보여질 문자열을 지정합니다.
//       rowTextForSelection={rowTextForSelection}
//       //? 아이템이 선택됐을 때 보여질 문자열을 지정합니다.
//       buttonTextAfterSelection={buttonTextAfterSelection}
//       renderDropdownIcon={renderDropdownIcon}
//       dropdownIconPosition="right"
//       {...props}
//     />
//   );
// }
