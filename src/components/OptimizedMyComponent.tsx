import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  ListRenderItem,
} from 'react-native';

type Item = {
  id: string | number;
  name: string;
};

type MyComponentProps = {
  data: Item[];
};

type SelectedItems = Set<string | number>;

const MyComponent = ({ data }: MyComponentProps) => {
  const [selectedItems, setSelectedItems] = useState<SelectedItems>(new Set());
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const filteredData = useMemo(() => {
    if (!searchTerm) {
      return data;
    }
    return data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const handleSelect = useCallback((item: Item) => {
    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = new Set(prevSelectedItems);
      if (newSelectedItems.has(item.id)) {
        newSelectedItems.delete(item.id);
      } else {
        newSelectedItems.add(item.id);
      }
      return newSelectedItems;
    });
  }, []);

  const handleClear = useCallback(() => {
    setSearchTerm('');
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        setIsSearching(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [searchTerm]);

  const renderItem: ListRenderItem<Item> = useCallback(
    ({item}) => (
      <TouchableOpacity
        style={[
          styles.itemContainer,
          selectedItems.has(item.id)
            ? {borderColor: 'green', borderWidth: StyleSheet.hairlineWidth}
            : {},
        ]}
        onPress={() => handleSelect(item)}>
        <Text style={styles.itemName}>
          {item.name}
        </Text>
        <Text style={styles.itemStatus} testID={`item-status-${item.id}`}>
          {selectedItems.has(item.id) ? 'Selected' : 'Not selected'}
        </Text>
      </TouchableOpacity>
    ),
    [handleSelect, selectedItems],
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          onChangeText={setSearchTerm}
          value={searchTerm}
          placeholder={'Search your animal...'}
          placeholderTextColor="#999"
        />
        {searchTerm?.length && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>
      {isSearching && <ActivityIndicator size="large" color="red" testID="loading-indicator" />}
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <View>
            <Text style={styles.emptyText}>
              {searchTerm ? 'No results found' : 'Type something to search...'}
            </Text>
          </View>
        }
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fafafa',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    backgroundColor: '#fff',
  },
  clearButton: {
    padding: 8,
    backgroundColor: '#fff',
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 8,
  },
  clearButtonText: {
    color: 'red',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  itemName: {
    fontSize: 16,
    color: '#333',
  },
  itemStatus: {
    fontSize: 14,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#999',
  },
  listContainer: {
    flexGrow: 1,
  },
});

export default MyComponent;
