<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-container>
        <HeaderTitle title="Courses"></HeaderTitle>


        <v-data-table
                :headers="this.headers"
                :items="this.content"
                :item-key="this.content.id"
                :search="search"
                :pagination.sync="pagination"
                :disable-initial-sort="true"
                hide-actions
                class="elevation-3"
        >
            <template v-slot:items="content">
                <tr v-on:click="deleteCourse(content.item.id)">
                    <td class="px-3">{{ content.item.title }}</td>
                    <td class="px-3">{{ content.item.description }}</td>
                    <td class="px-3">
                        <v-btn icon color="red">
                            <v-icon>delete_forever</v-icon>
                        </v-btn>
                    </td>
                </tr>
            </template>
        </v-data-table>
        <div class="text-xs-right pt-2">
            <v-pagination v-model="pagination.page" :length="pages" :total-visible="7" color="black"></v-pagination>
        </div>
    </v-container>
</template>

<script>
    import HeaderTitle from "@/components/HeaderTitle.vue";
    import axios from "axios";

    export default {
        data() {
            return {
                headers: [
                    {
                        text: "Title",
                        sortable: true,
                        value: "title",
                        class: "px-3"
                    },
                    {
                        text: "Description",
                        sortable: true,
                        value: "description",
                        class: "px-3"
                    },
                    {
                        text: "Delete",
                        sortable: false,
                        class: "px-3"
                    },
                ],
                pagination: {
                    search: "",
                    page: 1,
                    rowsPerPage: 10
                },
                content: [],
                search: ""
            };
        },
        computed: {
            pages() {
                // eslint-disable-next-line
                this.pagination.totalItems = this.content.length;

                if (
                    this.pagination.rowsPerPage == null ||
                    this.pagination.totalItems == null
                )
                    return 0;

                return Math.ceil(
                    this.pagination.totalItems / this.pagination.rowsPerPage
                );
            }
        },
        components: {
            HeaderTitle
        },
        mounted() {
            this.getAllCourses();
        },
        methods: {
            deleteCourse(id) {
                axios
                    .delete('http://localhost:3000/api/course/delete/' + id)
                    .then(response => {
                        if (response.status === 200) {
                            this.getAllCourses();
                        }
                    }).catch(error => {
                    console.log(error)
                })
            },
            getAllCourses() {
                axios
                    .get("http://localhost:3000/api/course")
                    .then(response => {
                        this.content = response.data;
                    });
            }
        }
    }
</script>

<style>
    .center {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }

    .background {
        background-color: darkblue;
    }
</style>
