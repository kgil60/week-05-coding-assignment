// members
class Member {
    constructor(name, instrument) {
        this.name = name;
        this.instrument = instrument;
    }

    // returns a description of the member
    describe() {
        return `${this.name} plays ${this.instrument}.`;
    }
}

// bands
class Band {
    constructor(name) {
        this.name = name;
        this.members = [];
    }

    // add a member
    addMember(member) {
        if (member instanceof Member) {
            this.members.push(member);
        } else {
            throw new Error(`You can only add an instance of Member. \n Argument is invalid: ${member}`);
        }
    }
    
    // returns how many members are in the band
    describe() {
        return `${this.name} has ${this.members.length} members.`
    }
}

// menu class
class Menu {
    constructor() {
        this.bands = [];
        this.selectedBand = null;
    }

    // starts application
    start() {
        let selection = this.showMenuOptions();
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createBand();
                    break;
                case '2':
                    this.viewBand();
                    break;
                case '3':
                    this.deleteBand();
                    break;
                case '4':
                    this.displayBands();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMenuOptions();
        }
        alert('Goodbye!')
    }

    // shows menu options
    showMenuOptions() {
        return prompt(`
            0) Exit
            1) Create New Band
            2) View Band
            3) Delete Band
            4) Display All Bands
        `)
    }

    // shows band menu options
    showBandMenuOptions(bandInfo) {
        return prompt(`
            0) Back
            1) Add New Member
            2) Delete Member
            ------------------
            ${bandInfo}
        `)
    }

    // displays all bands
    displayBands() {
        let bandString = '';

        for (let i=0; i<this.bands.length; i++) {
            bandString += i + ') ' + this.bands[i].name + '\n';
        }
        alert(bandString);
    }

    // create a band
    createBand() {
        let name = prompt(`Enter band name: `);
        this.bands.push(new Band(name));
    }

    // view specific band
    viewBand() {
        let index = prompt(`Enter the index of the band you want to view: `);
        if (index >= 0 && index < this.bands.length) {
            this.selectedBand = this.bands[index];
            let description = `Name: ${this.selectedBand.name} \n`;
            description += ' ' + this.selectedBand.describe() + '\n';
            
            for (let i=0; i<this.selectedBand.members.length; i++) {
                description += i + ') ' + this.selectedBand.members[i].describe() + '\n';
            }
            let selection1 = this.showBandMenuOptions(description);

            switch (selection1) {
                case '1':
                    this.createMember();
                    break;
                case '2':
                    this.deleteMember();
                    break;
            }
        }
    }

    // delete band
    deleteBand() {
        let index = prompt(`Enter the index of the band you want to delete: `);
        if (index >= 0 && index < this.bands.length) {
            this.bands.splice(index, 1);
        }
    }

    // create a member
    createMember() {
        let name = prompt('Enter name for the member: ');
        let instrument = prompt('Enter the member\'s instrument: ');

        this.selectedBand.addMember(new Member(name, instrument));
    }

    // delete member
    deleteMember() {
        let index = prompt('Enter the index of the player you want to delete: ');
        if (index >= 0 && index < this.selectedBand.members.length) {
            this.selectedBand.members.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();