import { resetSequence } from '../utils/sequenceUtils.js';
import { getNextId } from '../utils/sequenceUtils.js';

/**
 * Middleware factory to reset sequence after a delete operation
 * @param {string} tableName - Name of the table
 * @param {string} [idColumn='id'] - Name of the ID column
 * @returns {Function} Express middleware function
 */
export const withSequenceReset = (tableName, idColumn = 'id') => {
  return async (req, res, next) => {
    // Save the original json method
    const originalJson = res.json;
    
    // Override the json method
    res.json = async function(data) {
      // If the operation was successful (status 200-299) and it's a DELETE request
      if (res.statusCode >= 200 && res.statusCode < 300 && req.method === 'DELETE') {
        try {
          await resetSequence(tableName, idColumn, req.transaction);
          // If you want to include the next available ID in the response
          if (data && typeof data === 'object') {
            const nextId = await getNextId(tableName, idColumn, req.transaction);
            data.nextId = nextId;
          }
        } catch (error) {
          console.error(`Error resetting sequence for ${tableName}:`, error);
          // Don't fail the request if sequence reset fails
        }
      }
      // Call the original json method
      originalJson.call(this, data);
    };
    
    next();
  };
};

export default withSequenceReset;
