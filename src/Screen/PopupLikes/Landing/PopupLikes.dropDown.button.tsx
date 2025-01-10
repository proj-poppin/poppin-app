import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  FlatList,
} from 'react-native';
import VButton from 'src/Resource/svg/down-arrow-black-icon.svg';

type DropdownItem = {
  label: string;
  value: string;
};

export type DropdownButtonWithMenuProps = {
  label: string; // 현재 선택된 텍스트
  items: DropdownItem[]; // 드롭다운 항목들
  onSelect: (value: string) => void; // 항목 선택 시 실행될 함수
};

const DropdownButtonWithMenu: React.FC<DropdownButtonWithMenuProps> = ({
  label,
  items,
  onSelect,
}) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleSelect = (item: DropdownItem) => {
    onSelect(item.value);
    setIsMenuVisible(false);
  };

  return (
    <>
      {/* 드롭다운 버튼 */}
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => setIsMenuVisible(!isMenuVisible)}>
        <Text style={styles.buttonText}>{label}</Text>
        <VButton width={16} height={16} />
      </TouchableOpacity>

      {/* 드롭다운 메뉴 */}
      {isMenuVisible && (
        <View style={styles.menuContainer}>
          {items.map(item => (
            <TouchableOpacity
              key={item.value}
              style={styles.menuItem}
              onPress={() => handleSelect(item)}>
              <Text style={styles.menuItemText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </>
  );
};

export default DropdownButtonWithMenu;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  buttonText: {
    fontSize: 14,
    color: '#000',
  },
  menuContainer: {
    position: 'absolute',
    top: 50,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    zIndex: 10,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  menuItemText: {
    fontSize: 14,
    color: '#000',
  },
});
