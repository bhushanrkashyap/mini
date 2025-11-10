from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.contrib.auth.models import User
from django.contrib import messages
from datetime import datetime


def auth_view(request):
    """Unified authentication page (login + signup)"""
    if request.user.is_authenticated:
        return redirect('algosphere:dashboard')
    
    if request.method == 'POST':
        action = request.POST.get('action', 'login')
        
        if action == 'login':
            username = request.POST.get('username')
            password = request.POST.get('password')
            
            user = authenticate(request, username=username, password=password)
            if user is not None:
                auth_login(request, user)
                messages.success(request, f'Welcome back, {username}!')
                return redirect('algosphere:dashboard')
            else:
                messages.error(request, 'Invalid username or password.')
        
        elif action == 'signup':
            username = request.POST.get('username')
            dob = request.POST.get('dob')
            password = request.POST.get('password')
            password2 = request.POST.get('password2')
            
            # Validation
            if password != password2:
                messages.error(request, 'Passwords do not match.')
            elif User.objects.filter(username=username).exists():
                messages.error(request, 'Username already exists.')
            elif len(password) < 6:
                messages.error(request, 'Password must be at least 6 characters long.')
            else:
                # Create user
                user = User.objects.create_user(username=username, password=password)
                user.first_name = dob
                user.save()
                
                messages.success(request, 'Account created successfully! You can now log in.')
    
    return render(request, 'algosphere/auth.html')


def auth_view(request):
    """Unified authentication page (login + signup)"""
    if request.user.is_authenticated:
        return redirect('algosphere:dashboard')
    
    if request.method == 'POST':
        action = request.POST.get('action', 'login')
        
        if action == 'login':
            username = request.POST.get('username')
            password = request.POST.get('password')
            
            user = authenticate(request, username=username, password=password)
            if user is not None:
                auth_login(request, user)
                messages.success(request, f'Welcome back, {username}!')
                return redirect('algosphere:dashboard')
            else:
                messages.error(request, 'Invalid username or password.')
        
        elif action == 'signup':
            username = request.POST.get('username')
            dob = request.POST.get('dob')
            password = request.POST.get('password')
            password2 = request.POST.get('password2')
            
            # Validation
            if password != password2:
                messages.error(request, 'Passwords do not match.')
            elif User.objects.filter(username=username).exists():
                messages.error(request, 'Username already exists.')
            elif len(password) < 6:
                messages.error(request, 'Password must be at least 6 characters long.')
            else:
                # Create user
                user = User.objects.create_user(username=username, password=password)
                user.first_name = dob
                user.save()
                
                messages.success(request, 'Account created successfully! You can now log in.')
    
    return render(request, 'algosphere/auth.html')


def dashboard(request):
    return render(request, 'algosphere/dashboard.html')


def arrays(request):
    return render(request, 'algosphere/arrays.html')


def stacks(request):
    return render(request, 'algosphere/stacks.html')


def queues(request):
    return render(request, 'algosphere/queues.html')


def trees(request):
    return render(request, 'algosphere/trees.html')


def graphs(request):
    return render(request, 'algosphere/graphs.html')


def comparison(request):
    return render(request, 'algosphere/comparison.html')


def logout_view(request):
    auth_logout(request)
    messages.success(request, 'You have been logged out successfully.')
    return redirect('algosphere:auth')
