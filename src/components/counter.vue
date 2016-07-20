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
				console.log(this.equation)
			},
			addOperator: function(event){  //get the operator value and push in operator[]
				this.continue = false
				this.countValue += event.target.innerHTML
				this.equation.push(event.target.innerHTML)
			},
			compute: function() {  //excute the equation
				var self = this;
				var type = {
					'+' : self.increase,
					'-' : self.decrease,
					'*' : self.multiply,
					'/' : self.divide
				},
				priority = {
					'+' : 2,
					'-' : 2,
					'(' : 0,
					')' : 1,
					'*' : 3,
					'/' : 3
				}
				if(self.countValue.match(/^[0-9]+([\+\-\*\/][0-9]+)+$/) !== null){  //judge the equation is valid or not
					console.log(this.equation)
				}else{
					console.log('the equation is not valid')
				}
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
				console.log(this.equation)
			},
			clearData: function() {   //reset the init state
				this.countValue = ''
				this.num = []
				this.operator = []
				this.continue = false
			},
			min: function([ a, b ] = [ 1, 1 ]){  //get the min index of 'x' and '/'
				let result = ''
				a < 0 ? result = b : b < 0 ? result = a : a < b ? result = a : result = b
				return result
			},
			location: function(symbol) {
				for (var i = 0, len = this.equation.length; i < len; i++) {
					if(this.equation[i] === symbol){
						return i;
						break;
					}
				}
				return -1;
			},
			middleTolate: function(equation) {
				for (var i = 0, len = equation.length; i < len; i++) {
					if(typeof(equation[i]) === 'number') {
						lateEquation.push(equation[i])
					}else{
						if(operateStack.length !==0 ) {
							if(priority[equation[i]] >= priority[operateStack[0]]) {
								lateEquation.unshift(equation[i])
							}else {
								for(var j = 1, len = operateStack.length; j < len; j++) {
									if(priority[operateStack[j]] < priority[equation[i]]) { 
										operateStack.splice(j-1, 0, equation[i])
									}
								}
								operateStack.push(equation[i])
							}
						}else {
							operateStack.push(equation[i])
						}
					}
				}
			}
		}
	}
</script>