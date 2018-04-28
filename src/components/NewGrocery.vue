<template>
  <b-container>
    <h3>Create Grocery</h3>
    <b-form @submit.prevent="validateBeforeSubmit" ref="form">
      <b-form-group id="fridges"
                    label="Fridge:"
                    label-for="fridgeSelect">
        <b-form-select id="fridgeSelect"
                      name="fridge"
                      :options="fridges"
                      v-model="form.fridge"
                      v-validate="'required'"
                      :class="{'input': true, 'is-danger': errors.has('fridge') }">
        </b-form-select>
        <span v-show="errors.has('fridge')" class="help is-danger">{{ errors.first('fridge') }}</span>
      </b-form-group>
      <b-form-group id="grocery"
                    label="Grocery:"
                    label-for="exampleInput1">
        <b-form-input id="exampleInput1"
                      name="grocery"
                      v-model="form.grocery"
                      v-validate="'required|alpha_spaces'"
                      :class="{'input': true, 'is-danger': errors.has('grocery') }"
                      type="text"
                      placeholder="grocery">
        </b-form-input>
        <span v-show="errors.has('grocery')" class="help is-danger">{{ errors.first('grocery') }}</span>
      </b-form-group>
      <b-form-group id="exampleInputGroup2"
                    label="Amount:"
                    label-for="exampleInput2">
        <b-form-input id="exampleInput2"
                      name="amount"
                      type="text"
                      v-model="form.amount"
                      v-validate="'required|numeric'"
                      :class="{'input': true, 'is-danger': errors.has('amount') }"
                      placeholder="Enter amount">
        </b-form-input>
        <span v-show="errors.has('amount')" class="help is-danger">{{ errors.first('amount') }}</span>
      </b-form-group>
      <b-button type="submit" variant="primary">Save <i class="fa fa-save" /></b-button>
      <router-link :to="'/'">Home</router-link>
    </b-form>
    <b-alert :show="dismissCountDown"
             dismissible
             :variant="mesasgeType"
             @dismissed="dismissCountDown=0">
      {{message}}
    </b-alert>
  </b-container>
</template>
<script>
export default {
  data () {
    return {
      form: {
        grocery: '',
        amount: 1,
        fridge: null
      },
      fridges: [
        { text: 'Select One', value: null },
        { text: 'Fridges 1', value: 1 },
        { text: 'Fridges 2', value: 2 }
      ],
      dismissCountDown: 0,
      message: '',
      mesasgeType: ''
    }
  },
  methods: {
    validateBeforeSubmit () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          if (this.form.amount > 0) {
            this.$store.dispatch('addGrocery', {
              grocery: {...this.form}
            }).then(() => {
              this.dismissCountDown = 2
              this.message = 'Create Success'
              this.mesasgeType = 'success'
              // this.$refs.form.reset()
            })
          } else {
            this.dismissCountDown = 2
            this.message = 'Amount must be greater than 0'
            this.mesasgeType = 'danger'
          }
        }
      })
    }
  }
}
</script>
<style scoped>
  label {
    color: #363636;
    display: block;
    font-weight: 700;
  }
  .input.is-danger {
    border-color: #ff3860;
  }
  .help.is-danger {
    color: #ff3860;
  }
  .help {
      display: block;
      font-size: 11px;
      margin-top: 5px;
  }
</style>
