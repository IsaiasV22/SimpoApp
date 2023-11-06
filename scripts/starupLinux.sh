# Inicia una nueva sesión tmux en segundo plano con el nombre 'backend'
tmux new-session -d -s backend './backendLinux.sh'

# Espera un poco para evitar conflictos de red o de procesos
sleep 10

# Inicia otra sesión tmux en segundo plano con el nombre 'frontend'
tmux new-session -d -s frontend './frontendLinux.sh'
