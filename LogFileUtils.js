const { ipcRenderer } = require('electron')

class Id_info {
    constructor(id, bus, first, lastData) {
        this.seconds = [0]
        this.id = id
        this.bus = bus
        this.first = first
        this.lastData = lastData
        this.inter = inter
        this.count = 1
        this.iCountPoints = [1]
        this.changeCount = 0
        this.iChangePoints = [0]
        this.datalist = []
        this.iDatalist = []
        this.iNumUniqPoints = [0]
        this.iNumNewPoints = [0]
        this.iDataIdx = 0
        this.time = 0
    }

    update() {
        this.iNumNewPoints[iNumNewPoints.length-1] = 
            this.datalist.length - this.iDataIdx;
        this.iNumNewPoints.push(0);
        this.iNumUniqPoints[iNumUniqPoints.length-1] = 
            this.iDatalist.length;
        this.iNumUniqPoints.push(0) ;
        this.iDataIdx = this.datalist.length
        this.iCountPoints.push(0) 
        this.changeCount.push(this.iChangePoints
            [iChangePoints.length-1]);
        this.iChangePoints.push(0);
        this.iDatalist = [];
    }

    calcSeconds() {
        let range = Math.ceil(this.time/this.inter)
        for(i=0;i<range;i++) {
            this.seconds.push(i*this.inter)
        }
    }
}

class MsgSet {
    constructor( file, interval ) {
        this.file = file
        console.log(this.file)
        this.interval = interval
        this.msgs = new Map()
        var first = 0
        var fields
        var data
        var time
        var description
        var lines = this.file.toString('utf-8'
            ).split(/\r?\n/)
        for (let i = 0; i < lines.length; i++) {
            console.log(lines[i])
            fields = lines[i].split( ' ' )
            for(let i = 0; i < fields.length; i++){
                console.log(fields[i])
            }
            description = fields[5] + ' ' + fields[3]
            if (first == 0){
                first = parseFloat(fields[1].replace(
                    /[()]/g, ''))
            }
            time = parseFloat(fields[1].replace(
                /[()]/g, '')) - first
            data = []
                for(let i = 10; i < fields.length; i++) {
                    data.push(fields[i])
                }
            let msg = this.msgs.get(description)
            if (msg) {
                msg.data.set(time, data)
            }else{
                this.msgs.set(description, (() => {
                    let msg = new Msg(description, fields[5], 
                        fields[3])
                    msg.data.set(time, data)
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

