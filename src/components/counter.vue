<template>
	<div class="count">
	  count is {{count}}
		<input type="text" name="value" v-model="countValue">
		<div class="num">
			<button v-for="i in 10" @click="getNum($event)">{{i}}</button>
		</div>
		<div class="operate">
			<button @click="addOperator($event)">+</button>
			<button @click="addOperator($event)">-</button>
			<button @click="addOperator($event)">x</button>
			<button @click="addOperator($event)">/</button>
			<button @click="clear">C</button>
			<button @click="compute">=</button>
		</div>
	</div>
</template>

<script>
	import * as actions from '../vuex/actions'
	export default {
		data() {
			return {
				countValue: '',
				num: [],
				operator: [],
				continue: false,
				order: 1
			}
		},
		vuex: {
			actions,
			getters: {
				count: state => state.count
			}
		},
		computed: {
			min: function([ a, b ] = [ 1, 1 ]){
				let result = ''
				a < 0 ? result = b : b < 0 ? result = a : a < b ? result = a : result = b
				return result
			},
			clearData: function() {
				this.countValue = ''
				this.num = []
				this.operator = []
				this.continue = false
			}
		},
		methods: {
			getNum: function(event) {
				var value = event.target.innerHTML
				this.countValue += value
				this.continue ? this.num.push(parseInt(this.num.pop().toString() + value)) : this.num.push(parseInt(value))
				this.continue = true
			},
			addOperator: function(event){
				this.continue = false
				this.countValue += event.target.innerHTML
				this.operator.push({operate:event.target.innerHTML,order: this.order})
				this.order++
			},
			compute: function() {
				var self = this;
				var type = {
					'+' : self.increase,
					'-' : self.decrease,
					'x' : self.multiply,
					'/' : self.divide
				}
				if(self.countValue.match(/^[0-9]+([\+\-x\/][0-9]+)+$/) !== null){
					self.operator.forEach(function(value,index){
						if(self.operator.indexOf('x') < 0 || self.operator.indexOf('/') < 0 ){
							console.dir(value)
							index === 0 ? type[value.operate]([self.num[index],self.num[index+1]]) : type[value.operate]([parseInt(self.count), self.num[index+1]])
						}else{
							var min = ([self.operator.indexOf('x'), self.operator.indexOf('/')])
							type[self.operator[min].operate]([ self.num[min], self.num[min+1] ])
							slef.operator[min].operate = ''
						}
					})
					self.clearData
				}else{
					console.log('the equation is not valid')
				}
			},
			clear: function() {
				this.clearData
			}
		}
	}
</script>