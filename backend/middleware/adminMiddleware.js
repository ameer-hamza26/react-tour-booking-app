import User from '../model/User.js';

export const adminProtect = async (req, res, next) => {
  try {
    // Check if user exists and has admin role
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin role required.'
      });
    }

    // Add user to request object
    req.adminUser = user;
    next();
  } catch (error) {
    console.error('Admin middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error in admin middleware'
    });
  }
}; 