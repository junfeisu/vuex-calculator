<style lang='sass'>
	@import './common/calculator.scss';
</style>

<template>
	<div class="count">
	  count is {{count}}
		<input type="text" name="value" v-model="countValue" readonly="true">
		<div class="num">
			<button class="num_button" v-for="i in 9" @click="getNum($event)">{{i+1}}</button>
		</div>
		<div class="num">
			<button v-for="operator in ['+','-','*','/','(',')']" class="num_button" @click="addOperator($event)">{{operator}}</button>
			<button class="num_button" @click="backpace">B</button>
			<button class="num_button" @click="clearData">C</button>
			<button class="num_button" @click="compute">=</button>
		</div>
	</div>
</template>

<script>
	import * as actions from '../vuex/actions'
	export default {
		data() {     
			return {
				countValue: '',  //the equation for show
				equation: [],  //the equation for translate
				lateEquation: [],  //  the equation for compute
				stack: [], 
				operateStack: [],
				continue: false,  //to joint the operate num 
				priority : {
					'+' : 2,
					'-' : 2,
					'(' : 0,
					')' : 1,
					'*' : 3,
					'/' : 3
				}
			}
		},
		vuex: {
			actions,
			getters: {
				count: state => state.count
			}
		},
		methods: {
			getNum: function(event) {   //get the operate num value and push in num[]
				var value = event.target.innerHTML
				this.countValue += value
				if(this.continue){
					this.equation.push(parseFloat(this.equation.pop().toString() + value))
				}else{
					this.equation.push(parseFloat(value))
				}
				this.continue = true
			},
			addOperator: function(event){  //get the operator value and push in operator[]
				this.continue = false
				this.countValue += event.target.innerHTML
				this.equation.push(event.target.innerHTML)
			},
			backpace: function() {
				let tmp = []
				let len = this.equation.length
				// reset the countValue
				tmp = this.countValue.split('')
				tmp.pop()
				this.countValue = tmp.toString()
				// reset the equation
				if(typeof (this.equation[len-1]) === 'number') {
				 this.equation[len-1] / 5 < 2 ? this.equation.pop() : this.equation[len-1] = parseInt(this.equation[len-1] / 10) 
				}else {
					this.equation.pop()
				}
			},
			 //reset the init state
			clearData: function() {  
				this.countValue = ''
				this.num = []
				this.operator = []
				this.continue = false
				this.equation = []
				this.lateEquation = []
			},
			compute: function() {  //excute the equation
				let self = this
				// if(self.countValue.match(/^[0-9]+([\+\-\*\/][0-9]+)+$/) !== null){  //judge the equation is valid or not
					self.middleTolate(self.equation)
					self.excute(self.lateEquation)
					console.log(self.lateEquation)
				// }else{
				// 	console.log('the equation is not valid')
				// }
			},
			//get the min index of 'x' and '/'
			min: function([ a, b ] = [ 1, 1 ]){  
				let result = ''
				a < 0 ? result = b : b < 0 ? result = a : a < b ? result = a : result = b
				return result
			},
			// get the location of operator in this.equation
			location: function(symbol) {
				for (var i = 0, len = this.equation.length; i < len; i++) {
					if(this.equation[i] === symbol){
						return i;
						break;
					}
				}
				return -1;
			},
			// transform the nifix expression to postfix expression
			middleTolate: function(equation) {
				var eLen = equation.length
				for (var i = 0 ; i < eLen; i++) {
					if(typeof(equation[i]) === 'number') {  //the nummber push into lateEquation directly
						this.lateEquation.push(equation[i])
					}else{
						if(this.operateStack.length !== 0 ) {  
							if(this.priority[equation[i]] === 0) {
								this.operateStack.unshift(equation[i])  //if the operator === '(' push into operateStack directly
							}else if(this.priority[equation[i]] === 1) {
									// push the operator in the front of '(' into lateEquation and delete it from operateStack
									for(var l = 0, oLen =this.operateStack.length; l < oLen; l++) {
										var shifted = this.operateStack.shift()
										if(shifted !== '('){
											this.lateEquation.push(shifted)
										}
									}
							}else {
								// if current operator's prioity over the first operator's prioity in operateStack push into operateStack directly
								if(this.priority[equation[i]] >= this.priority[this.operateStack[0]]) {
									this.operateStack.unshift(equation[i])
								}else {
									//push the operator in operateStack that it's prioity higher than the current operator's prioity into lateEquation
									for(var j = 0, oLen = this.operateStack.length ; j < oLen; j++) {
										if(this.priority[this.operateStack[j]] >= this.priority[equation[i]]) { 
											this.lateEquation.push(this.operateStack.shift())
										}
									}
									this.operateStack.push(equation[i])
								}
							}
						}else {
							// if the operateStack is null push into directly
							this.operateStack.push(equation[i])  
						}
					}
				}
				for(var k = 0, oLen = this.operateStack.length; k < oLen; k++) {
					this.lateEquation.push(this.operateStack.shift())
				}
			},
			excute: function(equation) {
				let type = {
					'+' : this.increase,
					'-' : this.decrease,
					'*' : this.multiply,
					'/' : this.divide
				}
				for(var m = 0, len = equation.length; m < len; m++) {
					if(typeof(equation[m]) === 'number') {
						this.stack.unshift(equation[m])
					}else {
						var first = this.stack.shift();
						var second = this.stack.shift();
						type[equation[m]]([second,first])
						this.stack.unshift(this.count)
					}
				}
			}
		}
	}
</script>