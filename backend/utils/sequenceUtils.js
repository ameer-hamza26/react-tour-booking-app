import sequelize from '../config/database.js';

/**
 * Resets the sequence for a table to the next available ID
 * @param {string} tableName - Name of the table
 * @param {string} idColumn - Name of the ID column (default: 'id')
 * @param {object} [transaction] - Optional transaction object
 */
export const resetSequence = async (tableName, idColumn = 'id', transaction = null) => {
  try {
    // Get the current max ID
    const [result] = await sequelize.query(
      `SELECT MAX(${idColumn}) as max_id FROM ${tableName}`,
      {
        transaction,
        type: sequelize.QueryTypes.SELECT
      }
    );
    
    const nextId = (result?.max_id || 0) + 1;
    
    // Reset the sequence
    await sequelize.query(
      `SELECT setval(pg_get_serial_sequence('${tableName}', '${idColumn}'), :nextId, false)`,
      {
        replacements: { nextId },
        transaction
      }
    );
    
    return nextId;
  } catch (error) {
    console.error(`Error resetting sequence for table ${tableName}:`, error);
    throw error;
  }
};

/**
 * Gets the next available ID for a table
 * @param {string} tableName - Name of the table
 * @param {string} idColumn - Name of the ID column (default: 'id')
 * @param {object} [transaction] - Optional transaction object
 */
export const getNextId = async (tableName, idColumn = 'id', transaction = null) => {
  try {
    const [result] = await sequelize.query(
      `SELECT MAX(${idColumn}) as max_id FROM ${tableName}`,
      {
        transaction,
        type: sequelize.QueryTypes.SELECT
      }
    );
    
    return (result?.max_id || 0) + 1;
  } catch (error) {
    console.error(`Error getting next ID for table ${tableName}:`, error);
    throw error;
  }
};
