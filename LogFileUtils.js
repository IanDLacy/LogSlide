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

class fileAna{
    constructor(file, interval){
        this.file = file
        this.interval = interval
    }

    analyze(){
        var lines = this.file.split('\n')
        return lines
    }
}

module.exports = fileAna

