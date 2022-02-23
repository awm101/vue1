<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <InputText type="text" placeholder="Search by title" v-model="title"/>
        <div class="input-group-append">&nbsp;&nbsp;
          <Button type="button" label="Search" icon="p-button-sm pi pi-search" :loading="loading[0]" @click="searchTitle" />
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Tutorials List</h4>
      <ul class="list-group">
        <li class="list-group-item" :class="{ active: index == currentIndex }" v-for="(tutorial, index) in tutorials"
          :key="index" @click="setActiveTutorial(tutorial, index)">
          {{ tutorial.title }}
        </li>
      </ul>
      <br>
      <Button label="Delete All" class="p-button-sm p-button-raised p-button-danger" @click="removeAllTutorials" />
    </div>

    <div class="col-md-6">
      <div v-if="currentTutorial">
        <h4>Tutorial</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentTutorial.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ currentTutorial.description }}
        </div>
        <div>
          <label><strong>Status:</strong></label> {{ currentTutorial.published ? "Published" : "Pending" }}
        </div>
        <router-link :to="'/tutorials/' + currentTutorial.id" class="no-decor"><Button label="Edit" class="p-button-sm p-button-raised p-button-warning" /></router-link>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Tutorial...</p>
      </div>
    </div>
  </div>
</template>
<script>
  import TutorialDataService from "../services/TutorialDataService";
  export default {
    name: "tutorials-list",
    data() {
      return {
        loading: [false, false, false],
        tutorials: [],
        currentTutorial: null,
        currentIndex: -1,
        title: ""
      };
    },
    methods: {
      load(index) {
            this.loading[index] = true;
            setTimeout(() => this.loading[index] = false, 1000);
      },
      retrieveTutorials() {
        TutorialDataService.getAll()
          .then(response => {
            this.tutorials = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
      refreshList() {
        this.retrieveTutorials();
        this.currentTutorial = null;
        this.currentIndex = -1;
      },
      setActiveTutorial(tutorial, index) {
        this.currentTutorial = tutorial;
        this.currentIndex = tutorial ? index : -1;
      },
      removeAllTutorials() {
        TutorialDataService.deleteAll()
          .then(response => {
            console.log(response.data);
            this.refreshList();
          })
          .catch(e => {
            console.log(e);
          });
      },

      searchTitle() {
        TutorialDataService.findByTitle(this.title)
          .then(response => {
            this.tutorials = response.data;
            this.setActiveTutorial(null);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    mounted() {
      this.retrieveTutorials();
    }
  };
</script>
<style lang="scss" scoped>
  .list {
    text-align: left;
    max-width: 750px;
    margin: auto;
  }
  .no-decor {
    text-decoration: none;
  }
  .p-button {
    margin-right: .5rem;
    font-weight: 600;
    color: white;
    transition-delay: 9999s;
}

.p-buttonset {
    .p-button {
        margin-right: 0;
    }
}

.sizes {
    .button {
        margin-bottom: .5rem;
        display: block;


        &:last-child {
            margin-bottom: 0;
        }
    }
}

@media screen and (max-width: 640px) {
    .p-button {
        margin-bottom: .5rem;

        &:not(.p-button-icon-only) {
            display: flex;
            width: 100%;
        }
    }

    .p-buttonset {
        .p-button {
            margin-bottom: 0;
        }
    }
}
</style>