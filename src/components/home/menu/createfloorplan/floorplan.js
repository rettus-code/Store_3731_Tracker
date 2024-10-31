const position = {
    name: '',
    training: false,
    trainee: ''
}

export const floorPlan = {
    floorManager: {
        title: 'FLOOR MGR',
        ...position
    },
    grillManager: {
        title: 'GRILL MANAGER',
        ...position
    },
    fcRunner: {
        title: 'FC RUN',
        ...position
    },
    dtRunner: {
        title: 'DT RUN',
        ...position
    },
    expo: {
        title: 'EXPO',
        ...position
    },
    curb: {
        title: 'CURB',
        ...position
    },
    s1Initiate: {
        title: 'S1 - INIT',
        ...position
    },
    s1Finish: {
        title: 'S1 - FINISH',
        ...position
    },
    meats1: {
        title: '4:1',
        ...position
    },
    meats2: {
        title: '10:1',
        ...position
    },
    backWall: {
        title: 'BACKWALL',
        ...position
    },
    s2Initiate: {
        title: 'S2 - INIT',
        ...position
    },
    s2Finish: {
        title: 'S2 - FINISH',
        ...position
    },
    delivery: {
        title: 'DELIVERY',
        ...position
    },
    digitalAmb: {
        title: 'DIGITAL AMB',
        ...position
    },
    breaker: {
        title: 'BREAKER',
        ...position
    },
    dtCash: {
        title: 'DT CASH',
        ...position
    },
    friesHash: {
        title: 'FRIES/HASH',
        ...position
    },
    present: {
        title: 'PRESENT',
        ...position
    },
    dtOT1: {
        title: 'DTOT1',
        ...position
    },
    dtOT2: {
        title: 'DTOT2',
        ...position
    },
    bdap: {
        title: 'BDAP',
        ...position
    }
}
export const optional = {
    optional1: {
        title: 'OPTIONAL1',
        ...position
    },
    optional2: {
        title: 'OPTIONAL2',
        ...position
    }
}

export const auxiliary = {
    projections: {
        title: 'PROJECTIONS',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
    },
    downShifts: {
        title: 'DOWNSHIFTS',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
    }
}

export const hours = ['','7am-8am', '8am-9am', '9am-10am', '10am-11am', '11am-12pm', '12pm-1pm', '1pm-2pm', '2pm-3pm', '3pm-4pm', '4pm-5pm', '5pm-6pm', '6pm-7pm', '7pm-8pm', '8pm-9pm'];

