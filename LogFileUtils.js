const { ipcRenderer } = require('electron')

// the main message set data structure. it is, at its core,
// a Map of message descriptors to message objects
class MsgSet {
    constructor(file) { // file is a log file buffer
        this.file = file
        this.msgs = new Map()
        var first = 0
        var fields
        var data
        var time
        var description
        var lines = this.file.toString('utf-8' // convert buffer to 
            ).split(/\r?\n/)                   // array of lines (strings) 
        for (let i = 0; i < lines.length; i++) {
            fields = lines[i].split( ' ' ) // fields are delimeted by ' '
            description = fields[5] + ' ' + fields[3] // id + bus
            // correct for time offset i.e zero it out
            if (first == 0){ 
                first = parseFloat(fields[1].replace(
                    /[()]/g, ''))
                    time = 0
            }else {
                time = parseFloat(fields[1].replace(
                    /[()]/g, '')) - first
            }
            // fields 10...n are data bytes
            data = []
            for(let i = 10; i < fields.length; i++) {
                data.push(fields[i])
            }
            // the following assignment either sets msg as a msg object 
            // or as undefined, if it has not yet been added to msgs
            // this way we dont overwrite existing message objects
            // each time we see a message with the same id + bus
            let msg = this.msgs.get(description) 
            if (msg) {
                msg.data.set(time, data) // data + time of occurance
            }else{
                this.msgs.set(description, (() => {
                    let msg = new Msg(description, fields[5], 
                        fields[3])
                    msg.data.set(time, data) // data + time of occurance
                    return msg
                })())
            }
        }
    }
}

class Msg { 
    constructor(description, id, bus) {
        this.description = description
        this.id = id
        this.bus = bus
        this.data = new Map()
    }
}

module.exports = MsgSet, Msg

