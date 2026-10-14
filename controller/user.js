const database = require( '../model/database.json' );
const fs = require( 'fs' );


// A helper function
const saveToDB = ( data ) => {
    return new Promise( ( resolve, reject ) => {
        fs.writeFile( './model/database.json', data, ( error, data ) => {
            if ( error ) {
                reject( 'Error writing to file' );
            } else {
                resolve( 'File written successfully' );
            }
        } );
    } );
};

const savelogsToDB = ( data ) => {
    return new Promise( ( resolve, reject ) => {
        fs.appendFile( './model/logs.txt', data, ( error, data ) => {
            if ( error ) {
                reject( "Error appending to file" );
            } else {
                resolve( "File updated successfuly" );
            }
        } );
    } );
};

const allUsers = ( req, res ) => {
    const users = database;
    res.status( 200 ).json( { data: users } );
};



// create new user
const newUser = async ( req, res ) => {
    const {name, gender} = req.body

    // create user object
    const user = {
        name,
        gender,
        id: database.length + 1
    };

    // update the database array
    database.push( user );
    await saveToDB( JSON.stringify( database, null, 2 ) );

    // send a response
    res.status( 201 ).json( { message: "User created successfuly", data: user } );

};

//get a single user
const singleUser = ( req, res ) => {
    const id = Number( req.params.id );
    const user = database.find( ( el ) => el.id === id );

    if ( user == null ) {
        return res.status( 404 ).json( { message: "User not found" } );
    }

    res.status( 200 ).json( { data: user } );
};

// update user details
const updateUser = async ( req, res ) => {
    // get the user id from the request params
    const id = Number( req.params.id );

    // find the user using the user id
    const user = database.find( ( el ) => el.id === id );

    // get the new details from request body
    const name = req.body.name;
    const gender = req.body.gender;

    // check if user exists , throw 404 error if not found
    if ( user == null ) {
        return res.status( 404 ).json( "User no found" );
    }

    // update the user with the new details provided
    user.name = name || user.name;
    user.gender = gender || user.gender;

    // save the update to the database
    await saveToDB( JSON.stringify( database, null, 2 ) );

    // send the success response to the client
    res.status( 200 ).json( { message: "User has been updated successfuly", data: user } );
};

// delete a user
const deleteUser = async ( req, res ) => {
    const id = Number( req.params.id );
    const indexOfUser = database.findIndex( ( el ) => el.id === id );
    if ( indexOfUser === -1 ) {
        return res.status( 404 ).json( "User not found" );
    }
    database.splice( indexOfUser, 1 );

    await saveToDB( JSON.stringify( database, null, 2 ) );
    res.status( 200 ).json( "User delected successfuly" );
};



module.exports = {
    allUsers,
    newUser,
    singleUser,
    updateUser,
    deleteUser,
    savelogsToDB
};