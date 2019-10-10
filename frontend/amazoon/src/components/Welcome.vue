<template>
    <div class="welcome">
        <form method="POST" :action=route class="welcome-form">
            <div class="welcome-form__inputs dropdown">
                <input type="text" name="jobTitle" value="" placeholder="Job title"/>
                <input type="text" name="salary" value="" placeholder="Salary+">
                <button type="button" class="welcome-form__filters-dropdown" @click="show = !show" :class="{open: show}">Filters</button>
                <button type="submit" @click.stop.prevent="submit()">
                   Find
                </button>
            </div>
            <div v-if="show" class="welcome-form__filters">
                <div>
                    <ul class="welcome-form__list">
                        <li v-for="index in 10" :key="index">
                            <label class="container">  Requirement {{index}} 
                                <input type="checkbox" :name='"Requirement " + [index]'>
                                <span class="checkmark"></span>
                            </label>
                        </li>
                    </ul>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'post',
  data() {
      return {
          apiLink: process.env.VUE_APP_NETWORK_URL,
          route: process.env.VUE_APP_NETWORK_URL + `/api/jobs`,
          requirement: 'requirement',
          show: false
      }
  },
  methods: {
      submit() {
        
        this.$router.push("/jobs")
      }
  }
}
</script>

<style lang="scss">
.welcome {
    height: calc(100vh - 56px);
    display: flex;
    justify-content: center;
    align-items: center;
}
.welcome-form {
    max-width: 1000px;
    width: 100%;

    &__filters {
        position: absolute;
        max-width: 1000px;
        width: 100%;
        padding: 8px 16px;
        margin-top: 30px;

        label {
            font-size: 18px;
        }
    }

    &__filters-dropdown {
        white-space: nowrap;
        display: flex;
        align-items: center;

        &::after {
            display: inline-block;
            margin-left: .255em;
            vertical-align: .255em;
            content: "";
            border-top: .3em solid;
            border-right: .3em solid transparent;
            border-bottom: 0;
            border-left: .3em solid transparent;
        }

        &.open {
            &::after {
                transform: rotate(180deg)
            }
        }
    }

    &__list {
        list-style: none;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
    }

    &__inputs {
        display: flex;
        justify-content: space-between;
        align-items: center;

        input {
            border: none;
            border-bottom: 2px solid #eee;
            background-color: #fff;
            padding: 4px 16px;
            font-size: 24px;
            transition: .4s;
            margin-right: 15px;

            &:first-of-type {
                width: 100%;
            }

            &:last-of-type {
                width: 35%;
            }

            &:focus {
                outline: none;
                border-bottom-color: #185682;
            }

            &:-webkit-autofill {
                background-color: #fff !important;
                -webkit-box-shadow: 0 0 0px 1000px #fff inset;

                &:hover {
                    background-color: #fff !important;
                    -webkit-box-shadow: 0 0 0px 1000px #fff inset;
                }

                &:focus {
                    background-color: #fff !important;
                    -webkit-box-shadow: 0 0 0px 1000px #fff inset;
                }
            }
        }

        button {
            background-color: transparent;
            border: 1px solid #185682;
            padding: 4px 24px;
            font-size: 24px;
            border-radius: 4px;
            color: #185682;
            transition: .2s;

            &:first-of-type {
                margin-right: 15px;
            }

            &:hover {
                color: #fff;
                background-color: #185682;
            }
        }
    }
}
.container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 4px;
}

.container:hover input ~ .checkmark {
  background-color: #ccc;
}

.container input:checked ~ .checkmark {
  background-color: #185682;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.container input:checked ~ .checkmark:after {
  display: block;
}

.container .checkmark:after {
  left: 10px;
  top: 5px;
  width: 6px;
  height: 12px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>