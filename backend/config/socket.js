/**
 * These are the socket namespace definitions
 * The io namespace is required (General socket)
 * Session is for sessions
 * Data is for live data from the vehicle
 */

// This makes the variables global for the entire application
// since components using these namespaces will import the file

var io, sessionNamespace, dataNamespace;

exports.io = io;
exports.sessionNamespace = sessionNamespace;
exports.dataNamespace = dataNamespace;
