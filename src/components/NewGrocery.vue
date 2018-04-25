<template>
  <b-container>
    <b-form @submit.prevent="validateBeforeSubmit" @reset="onReset">
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
      <b-form-group id="groceries"
                    label="Groceries:"
                    label-for="exampleInput1">
        <b-form-input id="exampleInput1"
                      name="groceries"
                      v-model="form.groceries"
                      v-validate="'required|alpha'"
                      :class="{'input': true, 'is-danger': errors.has('groceries') }"
                      type="text"
                      placeholder="Groceries">
        </b-form-input>
        <span v-show="errors.has('groceries')" class="help is-danger">{{ errors.first('groceries') }}</span>
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
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </b-container>
</template>
<script>
// import { mapActions } from 'vuex'
export default {
  data () {
    return {
      form: {
        groceries: '',
        amount: 0,
        fridge: null
      },
      fridges: [
        { text: 'Select One', value: null },
        'fridges1', 'fridges2', 'fridges3'
      ]
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      console.log(JSON.stringify(this.form))
    },
    onReset (evt) {
      evt.preventDefault()
    },
    validateBeforeSubmit () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$store.dispatch('setProduct', {
            product: this.form
          })
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
