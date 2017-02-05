class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (!config){
            throw new error();
        }
        this.initial = config.initial;
        this.state = this.initial;
        this.prev = null;
        this.deletedState = null;
        this.states = config.states;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
         return this.state;
    }
    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        this.prev = this.state;

        if (this.states[state]){
            this.state = state;
        }else {
            throw new error(); 
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
   trigger(event) {
        this.prev = this.state;

        if(this.states[this.state].transitions[event]){
            this.changeState(this.states[this.state].transitions[event]);
        } else {
            throw new error();
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.prev = null;
        this.state = this.initial;
       return this.state;

    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) { 
if (!event){ 
return Object.keys(this.states); 
} else { 
var states = []; 
for(var key in this.states){ 
if (this.states[key].transitions[event]){ 
states.push(key); 
} 
} 

return states; 
} 
} 

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() { 
if(this.prev){ 
this.deletedState = this.state; 
this.state = this.prev; 
this.prev = null; 
return true; 

} else { 
return false; 
} 
} 

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {}

    /**
     * Clears transition history
     */
    clearHistory() {}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
