export const handleSort = (items, sortBy,sortOrder) => {
    const sortedItems = items.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortBy] - b[sortBy];
      } else {
        return b[sortBy] - a[sortBy];
      }
    });
    return sortedItems;
  }