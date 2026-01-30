/**
 * Utility functions for managing group persistence
 */

interface Group {
  id: number;
  name: string;
  description: string;
  criteria: string[];
  donorCount: number;
  color: string;
  createdAt: string;
}

const GROUPS_STORAGE_KEY = "crm_custom_groups";

/**
 * Save custom groups to localStorage
 */
export const saveCustomGroups = (groups: Group[]): boolean => {
  try {
    // Only save groups with ID > 5 (custom groups)
    const customGroups = groups.filter(g => g.id > 5);
    localStorage.setItem(GROUPS_STORAGE_KEY, JSON.stringify(customGroups));
    console.log(`✓ Saved ${customGroups.length} custom groups to localStorage`);
    return true;
  } catch (error) {
    console.error("Failed to save groups to localStorage:", error);
    return false;
  }
};

/**
 * Load custom groups from localStorage
 */
export const loadCustomGroups = (): Group[] => {
  try {
    const customGroupsJson = typeof window !== 'undefined' ? localStorage.getItem(GROUPS_STORAGE_KEY) : null;
    if (!customGroupsJson) {
      console.log("No custom groups found in localStorage");
      return [];
    }
    const customGroups = JSON.parse(customGroupsJson);
    console.log(`✓ Loaded ${customGroups.length} custom groups from localStorage`);
    return customGroups;
  } catch (error) {
    console.error("Failed to load custom groups from localStorage:", error);
    return [];
  }
};

/**
 * Clear all custom groups from localStorage
 */
export const clearCustomGroups = (): boolean => {
  try {
    localStorage.removeItem(GROUPS_STORAGE_KEY);
    console.log("✓ Cleared all custom groups from localStorage");
    return true;
  } catch (error) {
    console.error("Failed to clear custom groups from localStorage:", error);
    return false;
  }
};

/**
 * Get custom group by ID
 */
export const getCustomGroup = (groups: Group[], id: number): Group | undefined => {
  return groups.find(g => g.id === id && g.id > 5);
};

/**
 * Delete custom group
 */
export const deleteCustomGroup = (groups: Group[], id: number): Group[] => {
  if (id <= 5) {
    throw new Error("Cannot delete built-in groups");
  }
  const updated = groups.filter(g => g.id !== id);
  saveCustomGroups(updated);
  return updated;
};

/**
 * Update custom group
 */
export const updateCustomGroup = (groups: Group[], updatedGroup: Group): Group[] => {
  if (updatedGroup.id <= 5) {
    throw new Error("Cannot edit built-in groups");
  }
  const updated = groups.map(g => g.id === updatedGroup.id ? updatedGroup : g);
  saveCustomGroups(updated);
  return updated;
};

/**
 * Create new custom group
 */
export const createCustomGroup = (groups: Group[], newGroup: Omit<Group, 'id' | 'donorCount' | 'createdAt'>): Group[] => {
  const maxId = Math.max(...groups.map(g => g.id), 5);
  const group: Group = {
    ...newGroup,
    id: maxId + 1,
    donorCount: 0,
    createdAt: new Date().toISOString().split('T')[0]
  };
  const updated = [...groups, group];
  saveCustomGroups(updated);
  return updated;
};
