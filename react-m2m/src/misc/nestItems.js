/**
 * Convert flat array of items with parentId into a nested structure.
 * @param {Array} inputItems - flat array of objects with parentId and id
 * @returns {Array} nested array with children
 */
export function nestItems(inputItems) {
    // Create a lookup table by id
    const lookup = {};
    inputItems.forEach(item => {
      lookup[item.id] = { ...item, children: [] };
    });
  
    const output = [];
  
    Object.values(lookup).forEach(item => {
      const parentId = item.parentId;
      if (parentId !== "0" && lookup[parentId]) {
        // Add to parent's children
        lookup[parentId].children.push(item);
      } else {
        // Top-level item
        output.push(item);
      }
    });
  
    return output;
  }
  