<template>
  <div>
    <b-row class="btn-create-row">
      <b-button variant="primary" @click="createGrocery" class="btn-create">
        <i class="fa fa-plus" />
      </b-button>
      <b-btn @click="showModal">Edit</b-btn>
    </b-row>
    <b-card no-body>
      <b-container fluid>
        <!-- User Interface controls -->
        <b-row>
          <b-col md="6" class="my-1">
            <b-form-group horizontal label="Filter" class="mb-0">
              <b-input-group>
                <b-form-input v-model="filter" placeholder="Type to Search" />
                <b-input-group-append>
                  <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col md="6" class="my-1">
            <b-form-group horizontal label="Sort" class="mb-0">
              <b-input-group>
                <b-form-select v-model="sortBy" :options="sortOptions">
                  <option slot="first" :value="null">-- none --</option>
                </b-form-select>
                <b-form-select :disabled="!sortBy" v-model="sortDesc" slot="append">
                  <option :value="false">Asc</option>
                  <option :value="true">Desc</option>
                </b-form-select>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col md="6" class="my-1">
            <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
          </b-col>
          <b-col md="6" class="my-1">
            <b-form-group horizontal label="Per page" class="mb-0">
              <b-form-select :options="pageOptions" v-model="perPage" />
            </b-form-group>
          </b-col>
        </b-row>

        <!-- Main table element -->
        <b-table show-empty
                striped
                hover
                stacked="md"
                :items="items"
                :fields="tableFields"
                :current-page="currentPage"
                :per-page="perPage"
                :filter="filter"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                @filtered="onFiltered"
        >
          <template slot="actions" slot-scope="row">
            <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
            <!-- <b-button size="sm" @click.stop="info(row.item, row.index, $event.target)" class="mr-1"  variant="success">
              Show Detail
            </b-button> -->
            <b-button size="sm" @click.prevent="deleteGrocery(row.item)" variant="primary">
              Used Up
            </b-button>
          </template>
          <template slot="row-details" slot-scope="row">
            <b-card>
              <ul>
                <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value}}</li>
              </ul>
            </b-card>
          </template>
        </b-table>

        <!-- Info modal -->
        <b-modal id="modalInfo" @hide="resetModal" :title="modalInfo.title" ok-only>
          <pre>{{ modalInfo.content }}</pre>
        </b-modal>
        <b-modal ref="myModalRef" hide-footer title="Change">
          <div class="grocery-list">
            <b-list-group>
              <b-list-group-item v-for="(value, key) in preGroceries" :key="key" v-if="value.fridge == 1" class="grocery-item"
                :class="{'input': true, 'is-selected': value.grocery == leftItem.grocery }">
                <span @click="oneToTwo(value)">{{ value.grocery }}</span>
              </b-list-group-item>
            </b-list-group>
            <div class="btn-action-group">
              <b-button variant="primary" @click="moveToLeft" class="btn-create" :disabled="!leftItem.fridge" >
                <i class="fa fa-angle-right" />
              </b-button>
              <b-button variant="primary" @click="moveToRight" class="btn-create"  :disabled="!rightItem.fridge">
                <i class="fa fa-angle-left" />
              </b-button>
            </div>
            <b-list-group>
              <b-list-group-item v-for="(value, key) in preGroceries" :key="key" v-if="value.fridge == 2" class="grocery-item"
                :class="{'input': true, 'is-selected': value.grocery == rightItem.grocery }">
                <span @click="twoToOne(value)"> {{ value.grocery }}</span>
              </b-list-group-item>
            </b-list-group>
          </div>
          <div>
            <b-button variant="primary" @click="apply">
              Apply
            </b-button>
          </div>
        </b-modal>
      </b-container>
    </b-card>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
export default {
  name: '',
  data () {
    return {
      name: '',
      tableFields: [
        { key: 'fridge', label: 'Fridge', sortable: true },
        { key: 'grocery', label: 'Grocery Name', sortable: true },
        { key: 'amount', label: 'Amount', sortable: true, 'class': 'text-center' },
        { key: 'actions', label: 'Actions' }
      ],
      currentPage: 1,
      perPage: 5,
      pageOptions: [ 5, 10, 15 ],
      sortBy: null,
      sortDesc: false,
      filter: null,
      modalInfo: { title: '', content: '' },
      leftItem: {},
      rightItem: {}
    }
  },
  created () {
    this.$store.dispatch('getGroceries')
    this.totalRows = this.items.length
  },
  computed: {
    ...mapGetters({
      items: 'allGroceries',
      preGroceries: 'preGroceries'
    }),
    ...mapState({
      applyFlag: state => state.groceries.applyFlag
    }),
    sortOptions () {
      // Create an options list from our tableFields
      return this.tableFields
        .filter(f => f.sortable)
        .map(f => { return { text: f.label, value: f.key } })
    }
  },
  methods: {
    ...mapActions([
      'deleteGrocery',
      'apply'
    ]),
    info (item, index, button) {
      this.modalInfo.title = `Row index: ${index}`
      this.modalInfo.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', 'modalInfo', button)
    },
    resetModal () {
      this.modalInfo.title = ''
      this.modalInfo.content = ''
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    createGrocery () {
      this.$router.push('/create')
    },
    moveToLeft () {
      this.$store.dispatch('oneToTwo', {
        grocery: {...this.leftItem}
      })
      this.leftItem = {}
    },
    moveToRight (grocery) {
      this.$store.dispatch('twoToOne', {
        grocery: {...this.rightItem}
      })
      this.rightItem = {}
    },
    oneToTwo (item) {
      this.leftItem = item
      this.rightItem = {}
    },
    twoToOne (item) {
      this.rightItem = item
      this.leftItem = {}
    },
    showModal () {
      this.$store.dispatch('format')
      this.$refs.myModalRef.show()
    },
    hideModal () {
      this.$refs.myModalRef.hide()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  .btn-create-row {
    justify-content: flex-end;
    margin-right: 15px;
    margin-bottom: 15px;
  }
  .btn-create {
    width: 50px;
    height: 50px;
    border-radius: 25px;
  }
  .grocery-list {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .btn-action-group {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .is-selected {
    background-color: #dddddd;
  }
  .grocery-item {
    cursor: pointer;
  }
</style>
