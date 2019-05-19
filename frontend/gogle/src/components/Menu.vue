<template>
    <nav class="navbar navbar-light menu">
        <a class="navbar-brand" href="#">Gogle Jobs</a>
    </nav>
</template>

<style lang="scss">
    $color-main: #009652;


    .menu{
        background-color: $color-main;

        & .navbar-brand {
            color: white;
            transition: .2s;

            &:hover{
                color: darken($color: white, $amount: 15%)
            }
        }
    }
</style>
