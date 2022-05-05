<template>
    <div>
    <nav 
    class="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
       <div class="container-fluid">
      <router-link class="navbar-brand" :to="{ name: 'Home' }"> SEULPAGE </router-link>

        <ul class="navbar-nav me-auto">
          <li class="nav-item active">
            <router-link class="nav-link"  to="/todos"> Todos </router-link></li>
        </ul>
       </div>
    </nav>
    </div>
    
</template>
<script>
export default {
    
}
</script>