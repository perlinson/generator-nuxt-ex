<template>
  <v-row justify="center" no-gutters>
    <v-card outlined width="100%">
      <v-data-table
        :headers="headers"
        :items="allCards"
        sort-by="calories"
        class="elevation-1"
      >
        <template #top>
          <v-toolbar flat>
            <v-toolbar-title>My CRUD</v-toolbar-title>
            <v-divider class="mx-4" inset vertical />
            <v-spacer />
            <v-dialog v-model="dialog" max-width="500px">
              <template #activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  New Item
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>

                      <%_ modelFields.forEach(function (field, i) { _%>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.<%= field %>"
                          label="<%= field %>"
                        />
                      </v-col>
                      <%_ }) _%>

                      
                      <!-- <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.calories"
                          label="Calories"
                        />
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.fat"
                          label="Fat (g)"
                        />
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.carbs"
                          label="Carbs (g)"
                        />
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.protein"
                          label="Protein (g)"
                        />
                      </v-col> -->
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="close"
                  >
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template #[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
        <template #no-data>
          <v-btn color="primary" @click="all">
            Reset
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data: () => ({
    search: '',
    createDialog: {
      visiable: false,
      name: '',
      description: '',
      image: ''
    },
    dialog: false,
    headers: [
      <%_ modelFields.forEach(function (field, i) { _%>
      {
        text:'<%= field %>',
        value: '<%= field %>'
      }<%= ','%>
      <%_ }) _%>
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      desc: ''
    },
    defaultItem: {
      name: '',
      desc: ''
    }
  }),

  computed: {
    ...mapGetters('card', ['allCards']),
    formTitle () {
      return this.editedIndex === -1 ? 'New Card' : 'Edit Card'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  created () {
    this.all()
  },

  methods: {
    ...mapActions('card', ['all', 'find', 'create', 'update', 'delete']),

    editItem (item) {
      this.editedIndex = this.allCards.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      confirm('Are you sure you want to delete this item?') &&
        this.delete(item.id)
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      console.log(this.editedItem.id, this.editedItem)
      if (this.editedIndex > -1) {
        this.update(this.editedItem)
      } else {
        this.create(this.editedItem)
      }
      this.close()

      console.log(this.allCards)
    }
  }
}
</script>

<style></style>

